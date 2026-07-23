from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db

from app.schemas.invoice import InvoiceResponse
from app.services.invoice.invoice_service import (
    generate_membership_invoice
)

router = APIRouter(
    prefix="/invoice",
    tags=["Invoice"]
)


@router.get(
    "/membership/{membership_id}",
    response_model=InvoiceResponse
)
def membership_invoice(
    membership_id: int,
    db: Session = Depends(get_db)
):
    return generate_membership_invoice(
        membership_id,
        db
    )