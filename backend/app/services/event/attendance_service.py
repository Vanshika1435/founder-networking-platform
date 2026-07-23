from datetime import datetime

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.event_registration import EventRegistration


def check_in(ticket_number: str, db: Session):

    registration = (
        db.query(EventRegistration)
        .filter(EventRegistration.ticket_number == ticket_number)
        .first()
    )

    if not registration:
        raise HTTPException(
            status_code=404,
            detail="Invalid Ticket."
        )

    if registration.attendance:
        raise HTTPException(
            status_code=400,
            detail="Attendance already marked."
        )

    registration.attendance = True
    registration.checked_in_at = datetime.utcnow()

    db.commit()
    db.refresh(registration)

    return {
        "message": "Attendance Marked Successfully",
        "ticket_number": registration.ticket_number,
        "checked_in_at": registration.checked_in_at
    }