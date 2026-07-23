from sqlalchemy.orm import Session
from app.models.user import User
from fastapi import HTTPException

def get_all_founders(
    db: Session,
    page: int = 1,
    limit: int = 10
):

    offset = (page - 1) * limit

    founders = (
        db.query(User)
        .filter(
            User.role == "member",
            User.approval_status == "Approved",
            User.is_active == True
        )
        .offset(offset)
        .limit(limit)
        .all()
    )

    return founders

def get_founder_by_id(founder_id: int, db: Session):

    founder = (
        db.query(User)
        .filter(
            User.id == founder_id,
            User.role == "member",
            User.approval_status == "Approved",
            User.is_active == True
        )
        .first()
    )

    if not founder:
        raise HTTPException(
            status_code=404,
            detail="Founder not found."
        )

    return founder


def search_founders(
    db: Session,
    name: str = None,
    company: str = None,
    industry: str = None,
    city: str = None
):

    query = (
        db.query(User)
        .filter(
            User.role == "member",
            User.approval_status == "Approved",
            User.is_active == True
        )
    )

    if name:
        query = query.filter(User.name.ilike(f"%{name}%"))

    if company:
        query = query.filter(User.company_name.ilike(f"%{company}%"))

    if industry:
        query = query.filter(User.industry.ilike(f"%{industry}%"))

    if city:
        query = query.filter(User.city.ilike(f"%{city}%"))

    return query.all()