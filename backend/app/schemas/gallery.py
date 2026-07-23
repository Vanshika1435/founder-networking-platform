from datetime import datetime
from pydantic import BaseModel


class GalleryCreate(BaseModel):
    title: str
    media_type: str
    category: str
    event_name: str | None = None
    year: int
    media_url: str
    description: str | None = None


class GalleryResponse(BaseModel):
    id: int
    title: str
    media_type: str
    category: str
    event_name: str | None
    year: int
    media_url: str
    description: str | None
    created_at: datetime

    class Config:
        from_attributes = True