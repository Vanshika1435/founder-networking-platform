from sqlalchemy.orm import Session

from app.models.event import Event

from app.schemas.event import EventCreate


def create_event(event: EventCreate, db: Session):

    new_event = Event(**event.model_dump())

    db.add(new_event)

    db.commit()

    db.refresh(new_event)

    return new_event


def get_events(db: Session):

    return db.query(Event).all()