from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession

from app.api import deps
from app.schemas import detection as detection_schema
from app.schemas import alert as alert_schema
from app.services.detection_service import detection_service
from app.services.alert_service import alert_service
from app.utils.storage import save_upload_file
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

async def process_detection_ai(detection_id: str, file_path: str, db: AsyncSession):
    # 1. YOLO detection
    yolo_results = yolo_detector.detect(file_path)
    
    # 2.if manhole detected, use gemini to verify
    if yolo_results:
        # for demo, we take the first manhole detection
        best_detection = max(yolo_results, key=lambda x: x["confidence"])
        
        # update detection in DB with YOLO results
        detection = await detection_service.get(db, id=detection_id)
        if detection:
            setattr(detection, "confidence", best_detection["confidence"])
            setattr(detection, "bbox_x", best_detection["bbox"][0])
            setattr(detection, "bbox_y", best_detection["bbox"][1])
            setattr(detection, "bbox_width", best_detection["bbox"][2])
            setattr(detection, "bbox_height", best_detection["bbox"][3])
            
            # gemini verification
            gemini_result = await gemini_client.verify_detection(file_path)
            
            if gemini_result.get("verified"):
                # determine that if it's a hazard or not
                severity = "MEDIUM"
                if "HIGH" in gemini_result["analysis"].upper():
                    severity = "HIGH"
                elif "CRITICAL" in gemini_result["analysis"].upper():
                    severity = "CRITICAL"
                
                setattr(detection, "severity", severity)
                setattr(detection, "status", "CONFIRMED")
                setattr(detection, "metadata_json", {"gemini_analysis": gemini_result["analysis"]})
                
                # create alert if hazard
                alert_in = alert_schema.AlertCreate(
                    camera_id=detection.camera_id,
                    title=f"Manhole Hazard Detected: {severity}",
                    description=gemini_result["analysis"],
                    severity=severity,
                    status="OPEN"
                )
                alert = await alert_service.create(db, obj_in=alert_in)
                setattr(detection, "alert_id", alert.id)
            
            await db.commit()

@router.post("/upload", response_model=detection_schema.Detection)
async def upload_detection(
    *,
    db: AsyncSession = Depends(deps.get_db),
    background_tasks: BackgroundTasks,
    camera_id: str = Form(...),
    file: UploadFile = File(...),
    current_user: deps.User = Depends(deps.get_current_active_user),
) -> Any:
    # 1. save file
    file_path = await save_upload_file(file, folder="detections")
    
    # 2. create initial detection record
    detection_in = detection_schema.DetectionCreate(
        camera_id=camera_id,
        object_class="manhole",
        confidence=0.0,
        bbox_x=0.0,
        bbox_y=0.0,
        bbox_width=0.0,
        bbox_height=0.0,
        image_url=file_path,
        status="PENDING",
        severity="LOW"
    )
    detection = await detection_service.create(db, obj_in=detection_in)
    
    # 3. queue AI processing
    background_tasks.add_task(process_detection_ai, detection.id, file_path, db)
    
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
