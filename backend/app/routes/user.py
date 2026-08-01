from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from app.models.user import User
from app.services.user.user_service import (
    get_all_members,
    get_member,
    approve_member,
    reject_member,
    suspend_member,
    activate_member,
)

from app.core.dependencies import require_admin

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.get("/")
def all_members(
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):
    return get_all_members(db)

@router.get("/dropdown")
def member_dropdown(
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):
    members = (
        db.query(User)
        .filter(User.role == "member")
        .order_by(User.name)
        .all()
    )

    return [
        {
            "id": m.id,
            "name": m.name,
            "email": m.email
        }
        for m in members
    ]
@router.get("/{member_id}")
def one_member(
    member_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):
    return get_member(member_id, db)


@router.put("/{member_id}/approve")
def approve(
    member_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):
    return approve_member(member_id, db)


@router.put("/{member_id}/reject")
def reject(
    member_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):
    return reject_member(member_id, db)


@router.put("/{member_id}/suspend")
def suspend(
    member_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):
    return suspend_member(member_id, db)


@router.put("/{member_id}/activate")
def activate(
    member_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):
    return activate_member(member_id, db)