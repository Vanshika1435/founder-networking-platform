from datetime import datetime
from pydantic import BaseModel


class EventRegistrationCreate(BaseModel):
    user_id: int
    event_id: int


class EventRegistrationResponse(BaseModel):
    id: int
    user_id: int
    event_id: int
    ticket_number: str
    attendance: bool
    registration_date: datetime

    class Config:
        from_attributes = True