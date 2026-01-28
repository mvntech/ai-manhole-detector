from typing import Optional, Any, Dict
from pydantic import BaseModel, field_validator
from datetime import datetime
from app.models.detection import DetectionStatus, Severity

class DetectionBase(BaseModel):
    camera_id: str
    object_class: str
    confidence: float
    bbox_x: float
    bbox_y: float
    bbox_width: float
    bbox_height: float
    image_url: Optional[str] = None
    video_url: Optional[str] = None
    status: DetectionStatus = DetectionStatus.PENDING
    severity: Severity = Severity.LOW
    metadata_json: Optional[Dict[str, Any]] = None

    @field_validator("image_url", mode="after")
    @classmethod
    def ensure_absolute_url(cls, v: Optional[str]) -> Optional[str]:
        if v and v.startswith("/uploads"):
            from app.core.config import settings
            return f"{settings.BACKEND_URL.rstrip('/')}{v}"
        return v

class DetectionCreate(DetectionBase):
    pass

class DetectionUpdate(BaseModel):
    status: Optional[DetectionStatus] = None
    severity: Optional[Severity] = None

class DetectionInDBBase(DetectionBase):
    id: str
    timestamp: datetime
    alert_id: Optional[str] = None
    
    class Config:
        from_attributes = True

class Detection(DetectionInDBBase):
    pass
