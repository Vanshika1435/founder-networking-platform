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
@router.get("/")
def get_all(
    db: Session = Depends(get_db)
):
    return membership_service.get_all_memberships(db)


@router.get("/{membership_id}")
def get_one(
    membership_id: int,
    db: Session = Depends(get_db)
):
    return membership_service.get_membership_by_id(
        membership_id,
        db
    )


@router.put("/{membership_id}/renew")
def renew(
    membership_id: int,
    db: Session = Depends(get_db)
):
    return membership_service.renew_membership(
        membership_id,
        db
    )
@router.delete("/{membership_id}")
def delete_membership(
    membership_id: int,
    db: Session = Depends(get_db)
):
    return membership_service.delete_membership(
        membership_id,
        db
    )
@router.put("/{membership_id}/approve")
def approve_membership(
    membership_id: int,
    db: Session = Depends(get_db)
):
    return membership_service.approve_membership(
        membership_id,
        db
    )


@router.put("/{membership_id}/reject")
def reject_membership(
    membership_id: int,
    db: Session = Depends(get_db)
):
    return membership_service.reject_membership(
        membership_id,
        db
    )


@router.put("/{membership_id}/suspend")
def suspend_member(
    membership_id: int,
    db: Session = Depends(get_db)
):
    return membership_service.suspend_member(
        membership_id,
        db
    )


@router.put("/{membership_id}/activate")
def activate_member(
    membership_id: int,
    db: Session = Depends(get_db)
):
    return membership_service.activate_member(
        membership_id,
        db
    )
@router.put("/{membership_id}")
def update_membership(
    membership_id: int,
    membership: MembershipCreate,
    db: Session = Depends(get_db)
):
    return membership_service.update_membership(
        membership_id,
        membership,
        db
    )