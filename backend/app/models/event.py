from sqlalchemy import Column, Integer, String, Date, Time, Float, Boolean

from database import Base


class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String, nullable=False)

    description = Column(String)

    banner = Column(String)

    speaker = Column(String)

    venue = Column(String)

    event_date = Column(Date)

    event_time = Column(Time)

    capacity = Column(Integer)

    ticket_price = Column(Float)

    is_active = Column(Boolean, default=True)