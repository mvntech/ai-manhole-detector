from typing import Generic, TypeVar, Optional, List
from pydantic import BaseModel

T = TypeVar("T")

class ResponseBase(BaseModel, Generic[T]):
    success: bool = True
    message: Optional[str] = None
    data: Optional[T] = None

class UserBase(BaseModel):
    email: str
    username: str
    full_name: Optional[str] = None
    role: str = "OPERATOR"
    is_active: bool = True

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    email: Optional[str] = None
    username: Optional[str] = None
    full_name: Optional[str] = None
    password: Optional[str] = None

class UserInDBBase(UserBase):
    id: str
    
    class Config:
        from_attributes = True

class User(UserInDBBase):
    pass
