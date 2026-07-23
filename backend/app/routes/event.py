from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from database import get_db

from app.schemas.event import (
    EventCreate,
    EventResponse
)

from app.services.event import event_service

router = APIRouter(
    prefix="/events",
    tags=["Events"]
)


@router.post("/", response_model=EventResponse)
def create_event(
    event: EventCreate,
    db: Session = Depends(get_db)
):
    return event_service.create_event(event, db)


@router.get("/", response_model=list[EventResponse])
def get_events(
    db: Session = Depends(get_db)
):
    return event_service.get_events(db)