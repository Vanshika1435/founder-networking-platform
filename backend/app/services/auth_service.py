from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import UserCreate
from app.schemas.auth import LoginRequest

from app.core.security import (
    hash_password,
    verify_password,
    create_access_token
)


def signup(user: UserCreate, db: Session):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    new_user = User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password),
        phone=user.phone,
        company_name=user.company_name,
        designation=user.designation,
        industry=user.industry,
        website=user.website,
        linkedin=user.linkedin,
        city=user.city,
        bio=user.bio,
        company_logo=user.company_logo,
        role="member",
        approval_status="Pending"
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User Registered Successfully",
        "user_id": new_user.id
    }


def login(user: LoginRequest, db: Session):
    print("LOGIN EMAIL:", user.email)

    db_user = db.query(User).filter(
        User.email == user.email
    ).first()

    print("USER FOUND:", db_user)

    if db_user:
        print("DB EMAIL:", db_user.email)
        print("HASH:", db_user.password)

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )
    print("PASSWORD MATCH:", verify_password(user.password, db_user.password))


    if not verify_password(
        user.password,
        db_user.password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )
    if db_user.approval_status != "Approved":
        raise HTTPException(
            status_code=403,
            detail="Your account is waiting for admin approval."
        )
    token = create_access_token(
        {
            "sub": db_user.email,
            "role": db_user.role
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }