from sqlalchemy import Column, Integer, String, Float, Boolean

from database import Base


class MembershipPlan(Base):
    __tablename__ = "membership_plans"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    description = Column(String)

    duration_months = Column(Integer, nullable=False)

    price = Column(Float, nullable=False)

    is_active = Column(Boolean, default=True)