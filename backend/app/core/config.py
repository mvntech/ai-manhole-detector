from typing import List, Union
from pydantic import AnyHttpUrl, validator
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
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = []

    @validator("BACKEND_CORS_ORIGINS", pre=True)
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> Union[List[str], str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)

    # AI
    GEMINI_API_KEY: str = ""
    YOLO_MODEL_PATH: str = "models/yolov8_manhole.pt"
    
    model_config = SettingsConfigDict(case_sensitive=True, env_file=".env")

settings = Settings()
