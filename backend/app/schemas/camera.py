from typing import Optional
from pydantic import BaseModel
from app.models.camera import CameraStatus

class CameraBase(BaseModel):
    name: str
    location: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    stream_url: Optional[str] = None
    rtsp_url: Optional[str] = None
    status: CameraStatus = CameraStatus.INACTIVE
    is_active: bool = True
    
    detection_enabled: bool = True
    detection_interval: int = 5
    confidence_threshold: float = 0.7

class CameraCreate(CameraBase):
    pass

class CameraUpdate(BaseModel):
    name: Optional[str] = None
    location: Optional[str] = None
    status: Optional[CameraStatus] = None
    is_active: Optional[bool] = None

class CameraInDBBase(CameraBase):
    id: str
    owner_id: str
    
    class Config:
        from_attributes = True

class Camera(CameraInDBBase):
    pass
