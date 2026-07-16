from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db

from app.schemas.membership_plan import (
    MembershipPlanCreate,
    MembershipPlanResponse,
)

from app.services import membership_plan_service

router = APIRouter(
    prefix="/membership-plans",
    tags=["Membership Plans"]
)


@router.post("/", response_model=MembershipPlanResponse)
def create_plan(
    plan: MembershipPlanCreate,
    db: Session = Depends(get_db)
):
    return membership_plan_service.create_plan(plan, db)


@router.get("/", response_model=list[MembershipPlanResponse])
def get_plans(db: Session = Depends(get_db)):
    return membership_plan_service.get_all_plans(db)