from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db

from app.schemas.contact import (
    ContactCreate,
    ContactResponse
)

from app.services.contact.contact_service import (
    submit_contact,
    get_all_messages
)

router = APIRouter(
    prefix="/contact",
    tags=["Contact Us"]
)


@router.post("/")
def contact_us(
    contact: ContactCreate,
    db: Session = Depends(get_db)
):
    return submit_contact(contact, db)


@router.get(
    "/",
    response_model=list[ContactResponse]
)
def all_messages(
    db: Session = Depends(get_db)
):
    return get_all_messages(db)