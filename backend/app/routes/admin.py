from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db

from app.services import admin_service
from app.core.dependencies import require_admin
from app.schemas.admin import MemberResponse

router = APIRouter(
    prefix="/admin",
    tags=["Admin"]
)


@router.get(
    "/pending-users",
    response_model=list[MemberResponse]
)
def pending_users(
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):
    return admin_service.get_pending_users(db)


@router.put("/approve-user/{user_id}")
def approve_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):
    return admin_service.approve_user(user_id, db)
@router.put("/reject-user/{user_id}")
def reject_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):
    return admin_service.reject_user(user_id, db)