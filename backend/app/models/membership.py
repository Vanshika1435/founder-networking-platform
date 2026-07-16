from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship

from database import Base


class Membership(Base):
    __tablename__ = "memberships"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    plan_id = Column(Integer, ForeignKey("membership_plans.id"))

    status = Column(String, default="Pending")

    payment_status = Column(String, default="Pending")

    start_date = Column(Date)

    expiry_date = Column(Date)

    user = relationship("User")

    plan = relationship("MembershipPlan")