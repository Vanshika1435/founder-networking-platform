from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.sql import func

from database import Base


class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    membership_id = Column(Integer, ForeignKey("memberships.id"), nullable=True)

    event_registration_id = Column(
        Integer,
        ForeignKey("event_registrations.id"),
        nullable=True
    )

    amount = Column(Float, nullable=False)

    payment_type = Column(String, nullable=False)
    # Membership / Event

    payment_method = Column(String, nullable=False)
    # UPI / Card / Wallet

    transaction_id = Column(String, unique=True)

    payment_status = Column(String, default="Pending")

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )