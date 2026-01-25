from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.api import deps
from app.schemas import camera as camera_schema
from app.services.camera_service import camera_service

router = APIRouter()

@router.get("/", response_model=List[camera_schema.Camera])
async def read_cameras(
    db: AsyncSession = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: deps.User = Depends(deps.get_current_active_user),
) -> Any:
    if current_user.role == "ADMIN":
        cameras = await camera_service.get_multi(db, skip=skip, limit=limit)
    else:
        cameras = await camera_service.get_multi(
            db, owner_id=current_user.id, skip=skip, limit=limit
        )
    return cameras

@router.post("/", response_model=camera_schema.Camera)
async def create_camera(
    *,
    db: AsyncSession = Depends(deps.get_db),
    camera_in: camera_schema.CameraCreate,
    current_user: deps.User = Depends(deps.get_current_active_user),
) -> Any:
    return await camera_service.create(db, obj_in=camera_in, owner_id=current_user.id)

@router.get("/{id}", response_model=camera_schema.Camera)
async def read_camera(
    *,
    db: AsyncSession = Depends(deps.get_db),
    id: str,
    current_user: deps.User = Depends(deps.get_current_active_user),
) -> Any:
    camera = await camera_service.get(db, id=id)
    if not camera:
        raise HTTPException(status_code=404, detail="Camera not found")
    if current_user.role != "ADMIN" and camera.owner_id != current_user.id:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    return camera

@router.put("/{id}", response_model=camera_schema.Camera)
async def update_camera(
    *,
    db: AsyncSession = Depends(deps.get_db),
    id: str,
    camera_in: camera_schema.CameraUpdate,
    current_user: deps.User = Depends(deps.get_current_active_user),
) -> Any:
    camera = await camera_service.get(db, id=id)
    if not camera:
        raise HTTPException(status_code=404, detail="Camera not found")
    if current_user.role != "ADMIN" and camera.owner_id != current_user.id:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    return await camera_service.update(db, db_obj=camera, obj_in=camera_in)

@router.delete("/{id}", response_model=camera_schema.Camera)
async def delete_camera(
    *,
    db: AsyncSession = Depends(deps.get_db),
    id: str,
    current_user: deps.User = Depends(deps.get_current_active_user),
) -> Any:
    camera = await camera_service.get(db, id=id)
    if not camera:
        raise HTTPException(status_code=404, detail="Camera not found")
    if current_user.role != "ADMIN" and camera.owner_id != current_user.id:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    return await camera_service.remove(db, id=id)
