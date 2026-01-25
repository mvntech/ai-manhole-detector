import enum
from sqlalchemy import Boolean, Column, String, DateTime, Enum, ForeignKey, Float, Integer
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.session import Base
import uuid

def generate_uuid():
    return str(uuid.uuid4())

class CameraStatus(str, enum.Enum):
    ACTIVE = "ACTIVE"
    INACTIVE = "INACTIVE"
    ERROR = "ERROR"
    MAINTENANCE = "MAINTENANCE"

class Camera(Base):
    __tablename__ = "cameras"

    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String, nullable=False)
    location = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    stream_url = Column(String)
    rtsp_url = Column(String)
    status = Column(Enum(CameraStatus), default=CameraStatus.INACTIVE)
    is_active = Column(Boolean, default=True)
    
    resolution_width = Column(Integer)
    resolution_height = Column(Integer)
    fps = Column(Integer)
    
    detection_enabled = Column(Boolean, default=True)
    detection_interval = Column(Integer, default=5)
    confidence_threshold = Column(Float, default=0.7)
    
    owner_id = Column(String, ForeignKey("users.id"))
    owner = relationship("User", back_populates="cameras")
    
    detections = relationship("Detection", back_populates="camera")
    alerts = relationship("Alert", back_populates="camera")
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
