from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from app.schemas.ticket import TicketResponse
from app.services.event.ticket_service import get_ticket

router = APIRouter(
    prefix="/tickets",
    tags=["Tickets"]
)


@router.get(
    "/{registration_id}",
    response_model=TicketResponse
)
def ticket(
    registration_id: int,
    db: Session = Depends(get_db)
):
    return get_ticket(registration_id, db)