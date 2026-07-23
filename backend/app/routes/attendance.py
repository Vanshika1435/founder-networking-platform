from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db

from app.services.event.attendance_service import check_in

router = APIRouter(
    prefix="/attendance",
    tags=["Attendance"]
)


@router.post("/{ticket_number}")
def mark_attendance(
    ticket_number: str,
    db: Session = Depends(get_db)
):
    return check_in(ticket_number, db)