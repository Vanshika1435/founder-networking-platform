from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.services.audit.audit_service import log_action
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
    log_action(
        user_email=user.email,
        action="Purchased Membership",
        module="Membership",
        db=db
    )
    return new_membership

def get_all_memberships(db: Session):

    memberships = (
        db.query(
            Membership,
            User.name,
            User.email,
            MembershipPlan.name
        )
        .join(User, Membership.user_id == User.id)
        .join(
            MembershipPlan,
            Membership.plan_id == MembershipPlan.id
        )
        .all()
    )

    result = []

    for membership, member_name, email, plan_name in memberships:

        result.append({
            "id": membership.id,
            "user_id": membership.user_id,
            "member_name": member_name,
            "email": email,

            "plan_id": membership.plan_id,
            "plan_name": plan_name,

            "status": membership.status,
            "payment_status": membership.payment_status,

            "start_date": membership.start_date,
            "expiry_date": membership.expiry_date
        })

    return result


def get_membership_by_id(membership_id: int, db: Session):

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

    return membership


from datetime import timedelta

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
def delete_membership(
    membership_id: int,
    db: Session
):

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

    db.delete(membership)
    db.commit()

    return {
        "message": "Membership deleted successfully."
    }
def approve_membership(
    membership_id: int,
    db: Session
):

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

    user = (
        db.query(User)
        .filter(User.id == membership.user_id)
        .first()
    )

    membership.status = "Active"
    user.approval_status = "Approved"
    user.is_active = True

    db.commit()

    return {
        "message": "Membership Approved Successfully."
    }
def reject_membership(
    membership_id: int,
    db: Session
):

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

    user = (
        db.query(User)
        .filter(User.id == membership.user_id)
        .first()
    )

    membership.status = "Rejected"
    user.approval_status = "Rejected"

    db.commit()

    return {
        "message": "Membership Rejected."
    }
def suspend_member(
    membership_id: int,
    db: Session
):

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

    user = (
        db.query(User)
        .filter(User.id == membership.user_id)
        .first()
    )

    user.is_active = False
    membership.status = "Suspended"

    db.commit()

    return {
        "message": "Member Suspended Successfully."
    }
def activate_member(
    membership_id: int,
    db: Session
):

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

    user = (
        db.query(User)
        .filter(User.id == membership.user_id)
        .first()
    )

    user.is_active = True
    membership.status = "Active"

    db.commit()

    return {
        "message": "Member Activated Successfully."
    }
def update_membership(
    membership_id: int,
    data: MembershipCreate,
    db: Session
):

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

    membership.user_id = data.user_id
    membership.plan_id = data.plan_id

    db.commit()
    db.refresh(membership)

    return membership