from sqlalchemy.orm import Session

from app.models.membership_plan import MembershipPlan
from app.schemas.membership_plan import MembershipPlanCreate


def create_plan(plan: MembershipPlanCreate, db: Session):

    new_plan = MembershipPlan(
        name=plan.name,
        description=plan.description,
        duration_months=plan.duration_months,
        price=plan.price
    )

    db.add(new_plan)
    db.commit()
    db.refresh(new_plan)

    return new_plan


def get_all_plans(db: Session):
    return db.query(MembershipPlan).all()