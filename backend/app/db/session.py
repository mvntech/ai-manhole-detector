from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
from app.core.config import settings

from sqlalchemy.engine import make_url

url = make_url(settings.DATABASE_URL)
clean_url = f"{url.drivername}://{url.username}:{url.password}@{url.host}/{url.database}"

engine = create_async_engine(
    clean_url,
    echo=True,
    connect_args={"ssl": True} if "neon.tech" in settings.DATABASE_URL or "sslmode" in settings.DATABASE_URL else {}
)
SessionLocal = sessionmaker(
    autocommit=False, autoflush=False, bind=engine, class_=AsyncSession, expire_on_commit=False
)

Base = declarative_base()

async def get_db():
    async with SessionLocal() as session:
        yield session
