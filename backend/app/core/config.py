from typing import List, Union, Any, Optional
from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "AI Manhole Detector"
    API_V1_STR: str = "/api/v1"
    BACKEND_URL: str = "http://localhost:8000"
    
    # database
    DATABASE_URL: str = "postgresql+asyncpg://user:password@localhost:5432/manhole_db"
    
    # redis
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # security
    SECRET_KEY: str = "secret-key-change-in-production"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8
    ALGORITHM: str = "HS256"
    
    # cors
    BACKEND_CORS_ORIGINS: Union[List[str], str] = ["http://localhost:3000", "http://127.0.0.1:3000"]

    @field_validator("BACKEND_CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Any) -> List[str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",") if i.strip()]
        elif isinstance(v, list):
            return [str(i) for i in v]
        return []

    # AI
    GEMINI_API_KEY: str = ""
    YOLO_MODEL_PATH: str = "models/yolov8_manhole.pt"
    
    # notifications (SMS - twilio)
    TWILIO_ACCOUNT_SID: Optional[str] = None
    TWILIO_AUTH_TOKEN: Optional[str] = None
    TWILIO_FROM_NUMBER: Optional[str] = None
    TO_PHONE_NUMBER: Optional[str] = None
    
    # notifications (email - sendgrid)
    SENDGRID_API_KEY: Optional[str] = None
    FROM_EMAIL: Optional[str] = None
    TO_EMAIL: Optional[str] = None

    model_config = SettingsConfigDict(
        case_sensitive=True, 
        env_file=".env",
        extra="ignore",
        protected_namespaces=()
    )

settings = Settings()
