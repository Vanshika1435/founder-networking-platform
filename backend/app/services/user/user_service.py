from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.user import User


def get_all_members(db: Session):

    return (
        db.query(User)
        .filter(User.role == "member")
        .order_by(User.created_at.desc())
        .all()
    )


def get_member(member_id: int, db: Session):

    member = (
        db.query(User)
        .filter(User.id == member_id)
        .first()
    )

    if not member:
        raise HTTPException(
            status_code=404,
            detail="Member not found."
        )

    return member


def approve_member(member_id: int, db: Session):

    member = get_member(member_id, db)

    member.approval_status = "Approved"

    db.commit()

    db.refresh(member)

    return member


def reject_member(member_id: int, db: Session):

    member = get_member(member_id, db)

    member.approval_status = "Rejected"

    db.commit()

    db.refresh(member)

    return member


def suspend_member(member_id: int, db: Session):

    member = get_member(member_id, db)

    member.is_active = False

    db.commit()

    db.refresh(member)

    return member


def activate_member(member_id: int, db: Session):

    member = get_member(member_id, db)

    member.is_active = True

    db.commit()

    db.refresh(member)

    return member