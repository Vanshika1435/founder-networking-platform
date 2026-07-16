from datetime import date, time

from pydantic import BaseModel


class EventCreate(BaseModel):

    title: str

    description: str

    banner: str

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