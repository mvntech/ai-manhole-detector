from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from app.models.alert import Alert
from app.schemas.alert import AlertCreate, AlertUpdate

class AlertService:
    async def get(self, db: AsyncSession, id: str) -> Optional[Alert]:
        result = await db.execute(
            select(Alert)
            .filter(Alert.id == id)
            .options(selectinload(Alert.detections))
        )
        return result.scalars().first()

    async def get_multi(
        self, db: AsyncSession, *, skip: int = 0, limit: int = 100, camera_id: Optional[str] = None
    ) -> List[Alert]:
        query = select(Alert)
        if camera_id:
            query = query.filter(Alert.camera_id == camera_id)
        result = await db.execute(query.offset(skip).limit(limit))
        return result.scalars().all()

    async def create(self, db: AsyncSession, *, obj_in: AlertCreate) -> Alert:
        db_obj = Alert(**obj_in.dict())
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj

    async def update(
        self, db: AsyncSession, *, db_obj: Alert, obj_in: AlertUpdate
    ) -> Alert:
        obj_data = obj_in.dict(exclude_unset=True)
        for field in obj_data:
            setattr(db_obj, field, obj_data[field])
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj

alert_service = AlertService()
