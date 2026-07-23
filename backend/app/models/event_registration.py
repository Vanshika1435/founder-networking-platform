from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    ForeignKey,
    DateTime
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from sqlalchemy import DateTime
from database import Base


class EventRegistration(Base):
    __tablename__ = "event_registrations"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    event_id = Column(Integer, ForeignKey("events.id"), nullable=False)

    ticket_number = Column(String, unique=True, nullable=False)

    attendance = Column(Boolean, default=False)

    registration_date = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    qr_code_path = Column(String, nullable=True)

    pdf_ticket_path = Column(String, nullable=True)

    user = relationship("User")
    event = relationship("Event")
    checked_in_at = Column(DateTime(timezone=True), nullable=True)