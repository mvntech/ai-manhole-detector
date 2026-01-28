from typing import List, Optional, Any
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from app.api import deps
from app.schemas import detection as detection_schema
from app.schemas import alert as alert_schema
from app.services.detection_service import detection_service
from app.services.alert_service import alert_service
from app.core.socket_manager import socket_manager
from app.db.session import SessionLocal
from app.utils.storage import save_upload_file, get_file_path_from_url
from app.ai.yolo_detector import yolo_detector
from app.ai.gemini_client import gemini_client

router = APIRouter()

@router.get("/", response_model=List[detection_schema.Detection])
async def read_detections(
    db: AsyncSession = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    camera_id: Optional[str] = None,
    current_user: deps.User = Depends(deps.get_current_active_user),
) -> Any:
    return await detection_service.get_multi(db, skip=skip, limit=limit, camera_id=camera_id)

async def process_detection_ai(detection_id: str, file_path: str):
    try:
        async with SessionLocal() as db:
            detection = await detection_service.get(db, id=detection_id)
            if not detection:
                return
            det_id = str(detection.id)
            det_camera_id = str(detection.camera_id)
            
            # 1. YOLO detection
            yolo_results = yolo_detector.detect(file_path)
        
            # initialize results
            confidence = 0.0
            severity = "LOW"
            gemini_analysis = ""

            # update initial bbox if YOLO found something
            if yolo_results:
                best_detection = max(yolo_results, key=lambda x: x["confidence"])
                detection.confidence = best_detection["confidence"]
                detection.bbox_x = best_detection["bbox"][0]
                detection.bbox_y = best_detection["bbox"][1]
                detection.bbox_width = best_detection["bbox"][2]
                detection.bbox_height = best_detection["bbox"][3]
                confidence = best_detection["confidence"]
            
            # broadcast that we are processing with Gemini
            await socket_manager.broadcast_detection({
                "id": det_id,
                "camera_id": det_camera_id,
                "status": "PROCESSING",
                "confidence": confidence
            })

            # Gemini verification
            gemini_result = await gemini_client.verify_detection(file_path)
            
            if gemini_result.get("verified"):
                severity = gemini_result.get("severity", "LOW")
                gemini_confidence = gemini_result.get("confidence", 0.0)
                description = gemini_result.get("description", gemini_result.get("analysis", ""))
                gemini_analysis = gemini_result.get("analysis", "")
                
                # if YOLO failed but Gemini found something, we use Gemini's confidence
                if not yolo_results or gemini_confidence > confidence:
                    confidence = gemini_confidence
                    detection.confidence = confidence
                
                detection.severity = severity
                detection.status = "CONFIRMED"
                detection.metadata_json = {"gemini_analysis": gemini_analysis}
                
                # create alert
                alert_in = alert_schema.AlertCreate(
                    camera_id=det_camera_id,
                    title=f"Manhole Hazard: {severity}",
                    description=description,
                    severity=severity,
                    status="OPEN"
                )
                alert = await alert_service.create(db, obj_in=alert_in)
                detection.alert_id = alert.id
                alert_id = str(alert.id)

                # broadcast alert
                await socket_manager.broadcast_alert({
                    "id": alert_id,
                    "camera_id": det_camera_id,
                    "title": alert.title,
                    "severity": severity,
                    "status": "OPEN"
                })

                # trigger external notifications for HIGH/CRITICAL
                if severity in ["HIGH", "CRITICAL"]:
                    from app.services.camera_service import camera_service
                    camera = await camera_service.get(db, id=det_camera_id)
                    location = camera.location if camera else "Unknown Location"
                    
                    from app.utils.notifications import notification_service
                    notification_service.trigger_alerts(
                        severity=severity,
                        location=location,
                        description=description
                    )
            else:
                # if Gemini failed
                if not yolo_results:
                    detection.status = "FALSE_POSITIVE"
                else:
                    detection.status = "CONFIRMED"
            
            await db.commit()
            
            # final detection update broadcast
            await socket_manager.broadcast_detection({
                "id": det_id,
                "camera_id": det_camera_id,
                "status": str(detection.status),
                "severity": severity,
                "confidence": confidence
            })
    except Exception as e:
        import traceback
        traceback.print_exc()

@router.post("/upload", response_model=detection_schema.Detection)
async def upload_detection(
    *,
    db: AsyncSession = Depends(deps.get_db),
    background_tasks: BackgroundTasks,
    camera_id: str = Form(...),
    file: UploadFile = File(...),
    current_user: deps.User = Depends(deps.get_current_active_user),
) -> Any:
    # 1. save file and get relative URL
    image_url = await save_upload_file(file, folder="detections")
    
    # 2. create initial detection record
    detection_in = detection_schema.DetectionCreate(
        camera_id=camera_id,
        object_class="manhole",
        confidence=0.0,
        bbox_x=0.0,
        bbox_y=0.0,
        bbox_width=0.0,
        bbox_height=0.0,
        image_url=image_url,
        status="PENDING",
        severity="LOW"
    )
    detection = await detection_service.create(db, obj_in=detection_in)
    
    # 3. get local file path for AI processing
    file_path = get_file_path_from_url(image_url)
    
    # 4. queue AI processing
    background_tasks.add_task(process_detection_ai, detection.id, file_path)
    
    return detection

@router.get("/{id}", response_model=detection_schema.Detection)
async def read_detection(
    *,
    db: AsyncSession = Depends(deps.get_db),
    id: str,
    current_user: deps.User = Depends(deps.get_current_active_user),
) -> Any:
    detection = await detection_service.get(db, id=id)
    if not detection:
        raise HTTPException(status_code=404, detail="Detection not found")
    return detection
