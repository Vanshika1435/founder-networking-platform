from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db

from app.schemas.renewal import MembershipRenewRequest
from app.services.membership.renewal_service import renew_membership
from app.core.dependencies import require_member

router = APIRouter(
    prefix="/renewal",
    tags=["Membership Renewal"]
)


@router.post("/")
def renew(
    request: MembershipRenewRequest,
    db: Session = Depends(get_db),
    current_user=Depends(require_member)
):
    return renew_membership(
        request.membership_id,
        request.payment_method,
        db
    )