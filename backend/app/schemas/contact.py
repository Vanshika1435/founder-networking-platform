from datetime import datetime
from pydantic import BaseModel, EmailStr


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str | None = None
    subject: str
    message: str


class ContactResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    phone: str | None = None
    subject: str
    message: str
    created_at: datetime

    class Config:
        from_attributes = True