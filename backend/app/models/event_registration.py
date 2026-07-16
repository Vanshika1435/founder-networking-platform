from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship

from database import Base


class EventRegistration(Base):
    __tablename__ = "event_registrations"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    event_id = Column(Integer, ForeignKey("events.id"))

    ticket_number = Column(String, unique=True)

    qr_code = Column(String)

    attendance = Column(Boolean, default=False)

    user = relationship("User")

    event = relationship("Event")