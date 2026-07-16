from pydantic import BaseModel, EmailStr
from typing import Optional


class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    phone: str

    company_name: Optional[str] = None
    designation: Optional[str] = None
    industry: Optional[str] = None
    website: Optional[str] = None
    linkedin: Optional[str] = None
    city: Optional[str] = None
    bio: Optional[str] = None
    company_logo: Optional[str] = None