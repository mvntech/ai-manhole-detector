import enum
from sqlalchemy import Column, String, DateTime, Enum, ForeignKey, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.session import Base
import uuid

def generate_uuid():
    return str(uuid.uuid4())

class AlertStatus(str, enum.Enum):
    OPEN = "OPEN"
    IN_PROGRESS = "IN_PROGRESS"
    RESOLVED = "RESOLVED"
    DISMISSED = "DISMISSED"

class Severity(str, enum.Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"

class Alert(Base):
    __tablename__ = "alerts"

    id = Column(String, primary_key=True, default=generate_uuid)
    camera_id = Column(String, ForeignKey("cameras.id"), nullable=False)
    camera = relationship("Camera", back_populates="alerts")
    
    title = Column(String, nullable=False)
    description = Column(String)
    severity = Column(Enum(Severity), default=Severity.MEDIUM, index=True)
    status = Column(Enum(AlertStatus), default=AlertStatus.OPEN, index=True)
    
    location = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    
    assigned_to_id = Column(String, ForeignKey("users.id"))
    assigned_to = relationship("User", back_populates="alerts")
    
    detections = relationship("Detection", back_populates="alert")
    
    created_at = Column(DateTime(timezone=True), server_default=func.now(), index=True)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    resolved_at = Column(DateTime(timezone=True))
