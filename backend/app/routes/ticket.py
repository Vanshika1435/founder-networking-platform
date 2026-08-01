from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from app.schemas.ticket import TicketResponse
from app.services.event.ticket_service import (
    get_ticket,
    get_all_tickets
)
router = APIRouter(
    prefix="/tickets",
    tags=["Tickets"]
)

@router.get("/")
def all_tickets(
    db: Session = Depends(get_db)
):
    return get_all_tickets(db)
@router.get(
    "/{registration_id}",
    response_model=TicketResponse
)
def ticket(
    registration_id: int,
    db: Session = Depends(get_db)
):
    return get_ticket(registration_id, db)