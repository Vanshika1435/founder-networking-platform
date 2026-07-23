from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.event_registration import EventRegistration
from app.models.user import User
from app.models.event import Event


def get_ticket(registration_id: int, db: Session):

    registration = (
        db.query(EventRegistration)
        .filter(EventRegistration.id == registration_id)
        .first()
    )

    if not registration:
        raise HTTPException(
            status_code=404,
            detail="Ticket not found."
        )

    user = (
        db.query(User)
        .filter(User.id == registration.user_id)
        .first()
    )

    event = (
        db.query(Event)
        .filter(Event.id == registration.event_id)
        .first()
    )

    return {
        "ticket_number": registration.ticket_number,
        "attendee_name": user.name,
        "event_name": event.title,
        "venue": event.venue,
        "event_date": event.event_date,
        "event_time": event.event_time,
        "registration_date": registration.registration_date
    }