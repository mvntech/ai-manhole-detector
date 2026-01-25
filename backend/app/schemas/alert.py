from typing import Optional, List
from pydantic import BaseModel
from datetime import datetime
from app.models.alert import AlertStatus, Severity

class AlertBase(BaseModel):
    camera_id: str
    title: str
    description: Optional[str] = None
    severity: Severity = Severity.MEDIUM
    status: AlertStatus = AlertStatus.OPEN
    location: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None

class AlertCreate(AlertBase):
    pass

class AlertUpdate(BaseModel):
    status: Optional[AlertStatus] = None
    severity: Optional[Severity] = None
    assigned_to_id: Optional[str] = None

class AlertInDBBase(AlertBase):
    id: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    resolved_at: Optional[datetime] = None
    assigned_to_id: Optional[str] = None
    
    class Config:
        from_attributes = True

class Alert(AlertInDBBase):
    pass
