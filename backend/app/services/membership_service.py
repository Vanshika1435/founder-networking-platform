from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.user import User
from app.models.membership import Membership
from app.models.membership_plan import MembershipPlan
from app.schemas.membership import MembershipCreate


def purchase_membership(
    membership: MembershipCreate,
    db: Session
):

    user = db.query(User).filter(
        User.id == membership.user_id
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    plan = db.query(MembershipPlan).filter(
        MembershipPlan.id == membership.plan_id
    ).first()

    if not plan:
        raise HTTPException(
            status_code=404,
            detail="Membership plan not found"
        )

    new_membership = Membership(
        user_id=user.id,
        plan_id=plan.id,
        status="Pending",
        payment_status="Pending"
    )

    db.add(new_membership)
    db.commit()
    db.refresh(new_membership)

    return new_membership