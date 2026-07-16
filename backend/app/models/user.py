from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func

from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    email = Column(String, unique=True, nullable=False)

    password = Column(String, nullable=False)

    phone = Column(String, nullable=False)

    company_name = Column(String)

    designation = Column(String)

    industry = Column(String)

    website = Column(String)

    linkedin = Column(String)

    city = Column(String)

    profile_photo = Column(String)

    bio = Column(String)

    company_logo = Column(String)

    role = Column(String, default="member")

    is_active = Column(Boolean, default=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())