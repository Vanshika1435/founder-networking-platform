from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db

from app.schemas.payment import PaymentCreate
from app.services.payment_service import (
    create_payment,
    get_all_payments,
    get_payment_by_id
)

router = APIRouter(
    prefix="/payments",
    tags=["Payments"]
)


@router.post("/")
def make_payment(
    payment: PaymentCreate,
    db: Session = Depends(get_db)
):
    return create_payment(payment, db)
@router.get("/")
def get_payments(
    db: Session = Depends(get_db)
):
    return get_all_payments(db)


@router.get("/{payment_id}")
def get_payment(
    payment_id: int,
    db: Session = Depends(get_db)
):
    return get_payment_by_id(
        payment_id,
        db
    )