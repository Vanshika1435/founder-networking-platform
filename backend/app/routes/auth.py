from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db

from app.schemas.user import UserCreate
from app.schemas.auth import LoginRequest
from fastapi.security import OAuth2PasswordRequestForm
from app.services import auth_service

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/signup")
def signup(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    return auth_service.signup(user, db)


@router.post("/login")
def login(
    user: LoginRequest,
    db: Session = Depends(get_db)
):
    return auth_service.login(user, db)
@router.post("/token")
def token_login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    login_request = LoginRequest(
        email=form_data.username,
        password=form_data.password
    )

    return auth_service.login(login_request, db)