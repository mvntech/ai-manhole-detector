import enum
from sqlalchemy import Column, String, DateTime, Enum, ForeignKey, Float, JSON, Index
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.session import Base
import uuid

def generate_uuid():
    return str(uuid.uuid4())

class DetectionStatus(str, enum.Enum):
    PENDING = "PENDING"
    CONFIRMED = "CONFIRMED"
    FALSE_POSITIVE = "FALSE_POSITIVE"
    RESOLVED = "RESOLVED"

class Severity(str, enum.Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"

class Detection(Base):
    __tablename__ = "detections"

    id = Column(String, primary_key=True, default=generate_uuid)
    camera_id = Column(String, ForeignKey("cameras.id"))
    camera = relationship("Camera", back_populates="detections")
    
    timestamp = Column(DateTime(timezone=True), server_default=func.now(), index=True)
    
    object_class = Column(String)
    confidence = Column(Float)
    
    bbox_x = Column(Float)
    bbox_y = Column(Float)
    bbox_width = Column(Float)
    bbox_height = Column(Float)
    
    image_url = Column(String)
    video_url = Column(String)
    
    status = Column(Enum(DetectionStatus), default=DetectionStatus.PENDING, index=True)
    severity = Column(Enum(Severity), default=Severity.LOW)
    
    metadata_json = Column(JSON)
    
    alert_id = Column(String, ForeignKey("alerts.id"))
    alert = relationship("Alert", back_populates="detections")

Index("ix_detections_camera_id_timestamp", Detection.camera_id, Detection.timestamp)
