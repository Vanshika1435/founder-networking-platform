from datetime import timedelta
from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.membership import Membership
from app.models.membership_plan import MembershipPlan
def renew_membership(membership_id: int, db: Session):

    membership = (
        db.query(Membership)
        .filter(Membership.id == membership_id)
        .first()
    )

    if not membership:
        raise HTTPException(
            status_code=404,
            detail="Membership not found."
        )

    membership.expiry_date = membership.expiry_date + timedelta(days=365)

    db.commit()
    db.refresh(membership)

    return {
        "message": "Membership renewed successfully.",
        "membership_id": membership.id,
        "new_expiry_date": membership.expiry_date
    }