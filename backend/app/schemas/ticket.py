from datetime import date, time, datetime
from pydantic import BaseModel


class TicketResponse(BaseModel):
    ticket_number: str
    attendee_name: str
    event_name: str
    venue: str
    event_date: date
    event_time: time
    registration_date: datetime

    class Config:
        from_attributes = True