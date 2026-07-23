from sqlalchemy.orm import Session

from app.models.event import Event

from app.schemas.event import EventCreate
from app.services.audit.audit_service import log_action

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


def get_events(db: Session):

    return db.query(Event).all()