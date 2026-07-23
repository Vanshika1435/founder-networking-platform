from datetime import datetime
from pydantic import BaseModel


class BlogCreate(BaseModel):
    title: str
    content: str
    author: str
    image: str | None = None


class BlogResponse(BaseModel):
    id: int
    title: str
    content: str
    author: str
    image: str | None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True