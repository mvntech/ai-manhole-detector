from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.camera import Camera
from app.schemas.camera import CameraCreate, CameraUpdate

class CameraService:
    async def get(self, db: AsyncSession, id: str) -> Optional[Camera]:
        result = await db.execute(select(Camera).filter(Camera.id == id))
        return result.scalars().first()

    async def get_multi(
        self, db: AsyncSession, *, skip: int = 0, limit: int = 100, owner_id: Optional[str] = None
    ) -> List[Camera]:
        query = select(Camera)
        if owner_id:
            query = query.filter(Camera.owner_id == owner_id)
        result = await db.execute(query.offset(skip).limit(limit))
        return result.scalars().all()

    async def create(self, db: AsyncSession, *, obj_in: CameraCreate, owner_id: str) -> Camera:
        db_obj = Camera(
            **obj_in.dict(),
            owner_id=owner_id
        )
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj

    async def update(
        self, db: AsyncSession, *, db_obj: Camera, obj_in: CameraUpdate
    ) -> Camera:
        obj_data = obj_in.dict(exclude_unset=True)
        for field in obj_data:
            setattr(db_obj, field, obj_data[field])
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj

    async def remove(self, db: AsyncSession, *, id: str) -> Camera:
        result = await db.execute(select(Camera).filter(Camera.id == id))
        obj = result.scalars().first()
        await db.delete(obj)
        await db.commit()
        return obj

camera_service = CameraService()
