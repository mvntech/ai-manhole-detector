import asyncio
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.db.session import engine, Base
from app.models.user import User
from app.models.camera import Camera
from app.models.alert import Alert
from app.models.detection import Detection

async def init_models():
    async with engine.begin() as conn:
        # in production, we'll use alembic migrations
        # await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)

if __name__ == "__main__":
    asyncio.run(init_models())
    print("Database tables created successfully.")
