from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func

from database import Base


class Gallery(Base):
    __tablename__ = "gallery"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(200), nullable=False)

    media_type = Column(String(20), nullable=False)
    # Photo / Video

    category = Column(String(100), nullable=False)

    event_name = Column(String(150), nullable=True)

    year = Column(Integer, nullable=False)

    media_url = Column(String, nullable=False)

    description = Column(Text, nullable=True)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )