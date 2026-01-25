from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.api import deps
from app.schemas import alert as alert_schema
from app.services.alert_service import alert_service

router = APIRouter()

@router.get("/", response_model=List[alert_schema.Alert])
async def read_alerts(
    db: AsyncSession = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    camera_id: Optional[str] = None,
    current_user: deps.User = Depends(deps.get_current_active_user),
) -> Any:
    return await alert_service.get_multi(db, skip=skip, limit=limit, camera_id=camera_id)

@router.get("/{id}", response_model=alert_schema.Alert)
async def read_alert(
    *,
    db: AsyncSession = Depends(deps.get_db),
    id: str,
    current_user: deps.User = Depends(deps.get_current_active_user),
) -> Any:
    alert = await alert_service.get(db, id=id)
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    return alert

@router.put("/{id}", response_model=alert_schema.Alert)
async def update_alert(
    *,
    db: AsyncSession = Depends(deps.get_db),
    id: str,
    alert_in: alert_schema.AlertUpdate,
    current_user: deps.User = Depends(deps.get_current_active_user),
) -> Any:
    alert = await alert_service.get(db, id=id)
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    return await alert_service.update(db, db_obj=alert, obj_in=alert_in)
