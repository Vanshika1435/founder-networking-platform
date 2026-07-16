from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db

from app.schemas.membership import (
    MembershipCreate,
    MembershipResponse
)

from app.services import membership_service

router = APIRouter(
    prefix="/memberships",
    tags=["Memberships"]
)


@router.post("/", response_model=MembershipResponse)
def purchase_membership(
    membership: MembershipCreate,
    db: Session = Depends(get_db)
):
    return membership_service.purchase_membership(
        membership,
        db
    )