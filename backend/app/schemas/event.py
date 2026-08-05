from datetime import date, time
from typing import Optional
from pydantic import BaseModel


class EventCreate(BaseModel):

    title: str

    description: str

    banner: Optional[str] = None

    speaker: str

    venue: str

    event_date: date

    event_time: time

    capacity: int

    ticket_price: float


class EventResponse(EventCreate):

    id: int

    is_active: bool

    class Config:
        from_attributes = True