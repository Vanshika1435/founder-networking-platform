from sqlalchemy.orm import Session

from app.models.event import Event

from app.schemas.event import EventCreate
from app.services.audit.audit_service import log_action
from fastapi import HTTPException
def create_event(event: EventCreate, db: Session):

    new_event = Event(**event.model_dump())

    db.add(new_event)

    db.commit()

    db.refresh(new_event)
    log_action(
        user_email="admin@gmail.com",
        action=f"Created Event: {new_event.title}",
        module="Events",
        db=db
    )
    return new_event


def get_event(event_id: int, db: Session):

    event = (
        db.query(Event)
        .filter(Event.id == event_id)
        .first()
    )

    if not event:
        raise HTTPException(
            status_code=404,
            detail="Event not found."
        )

    return event


def update_event(
    event_id: int,
    data: EventCreate,
    db: Session
):

    event = (
        db.query(Event)
        .filter(Event.id == event_id)
        .first()
    )

    if not event:
        raise HTTPException(
            status_code=404,
            detail="Event not found."
        )

    for key, value in data.model_dump().items():
        setattr(event, key, value)

    db.commit()
    db.refresh(event)

    return event


def delete_event(
    event_id: int,
    db: Session
):

    event = (
        db.query(Event)
        .filter(Event.id == event_id)
        .first()
    )

    if not event:
        raise HTTPException(
            status_code=404,
            detail="Event not found."
        )

    db.delete(event)
    db.commit()

    return {
        "message": "Event deleted successfully."
    }
def get_events(db: Session):

    return (
        db.query(Event)
        .order_by(Event.event_date.desc())
        .all()
    )