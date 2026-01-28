from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import load_only
from app.models.detection import Detection
from app.schemas.detection import DetectionCreate, DetectionUpdate

class DetectionService:
    async def get(self, db: AsyncSession, id: str) -> Optional[Detection]:
        result = await db.execute(
            select(Detection)
            .filter(Detection.id == id)
            .options(load_only(
                Detection.id,
                Detection.camera_id,
                Detection.confidence,
                Detection.bbox_x,
                Detection.bbox_y,
                Detection.bbox_width,
                Detection.bbox_height,
                Detection.status,
                Detection.severity,
                Detection.metadata_json,
                Detection.alert_id
            ))
        )
        return result.scalars().first()

    async def get_multi(
        self, db: AsyncSession, *, skip: int = 0, limit: int = 100, camera_id: Optional[str] = None
    ) -> List[Detection]:
        query = select(Detection)
        if camera_id:
            query = query.filter(Detection.camera_id == camera_id)
        result = await db.execute(query.order_by(Detection.timestamp.desc()).offset(skip).limit(limit))
        return result.scalars().all()

    async def create(self, db: AsyncSession, *, obj_in: DetectionCreate) -> Detection:
        db_obj = Detection(**obj_in.dict())
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj

detection_service = DetectionService()
