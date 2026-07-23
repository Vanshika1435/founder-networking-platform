from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models.membership import Membership
from app.models.user import User
from app.services.audit.audit_service import log_action

def get_pending_users(db: Session):

    return db.query(User).filter(
        User.approval_status == "Pending"
    ).all()


def approve_user(user_id: int, db: Session):

    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    membership = (
        db.query(Membership)
        .filter(Membership.user_id == user.id)
        .first()
    )

    if membership is None:
        raise HTTPException(
            status_code=400,
            detail="User has not purchased any membership."
        )

    if membership.payment_status != "Paid":
        raise HTTPException(
            status_code=400,
            detail="Membership payment is pending."
        )

    user.approval_status = "Approved"

    membership.status = "Active"

    db.commit()

    db.refresh(user)
    log_action(
        user_email="admin@gmail.com",
        action=f"Approved User: {user.name}",
        module="Users",
        db=db
    )
    db.refresh(membership)

    return {
        "message": "Member Approved Successfully",
        "member": user.name,
        "membership_status": membership.status
    }
def reject_user(user_id: int, db: Session):

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    user.approval_status = "Rejected"

    db.commit()
    db.refresh(user)

    return {
        "message": f"{user.name} rejected successfully"
    }