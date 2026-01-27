from typing import List, Union, Any, Optional
from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "AI Manhole Detector"
    API_V1_STR: str = "/api/v1"
    
    # database
    DATABASE_URL: str = "postgresql+asyncpg://user:password@localhost:5432/manhole_db"
    
    # redis
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # security
    SECRET_KEY: str = "secret-key-change-in-production"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8
    ALGORITHM: str = "HS256"
    
    # cors
    BACKEND_CORS_ORIGINS: Any = ["http://localhost:3000", "http://127.0.0.1:3000"]

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
    
    model_config = SettingsConfigDict(
        case_sensitive=True, 
        env_file=".env",
        extra="ignore",
        protected_namespaces=()
    )

settings = Settings()
