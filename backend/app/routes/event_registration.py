from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from app.schemas.event_registration import EventRegistrationCreate
from app.services.event.registration_service import register_event

router = APIRouter(
    prefix="/event-registration",
    tags=["Event Registration"]
)


@router.post("/")
def register(
    registration: EventRegistrationCreate,
    db: Session = Depends(get_db)
):
    return register_event(registration, db)