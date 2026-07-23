from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from app.core.dependencies import require_admin
from app.services.reports.report_service import (
    membership_report,
    event_report,
    payment_report
)

router = APIRouter(
    prefix="/reports",
    tags=["Reports"]
)


@router.get("/memberships")
def memberships(
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):
    return membership_report(db)


@router.get("/events")
def events(
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):
    return event_report(db)


@router.get("/payments")
def payments(
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):
    return payment_report(db)