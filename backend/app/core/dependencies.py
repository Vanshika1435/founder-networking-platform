from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from database import get_db
from app.core.config import settings
from app.models.user import User

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")

def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    print("=" * 50)
    print("TOKEN RECEIVED:", token)

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
    )

    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM]
        )

        print("PAYLOAD:", payload)

        email = payload.get("sub")
        print("EMAIL:", email)

        if email is None:
            raise credentials_exception

    except Exception as e:
        print("JWT ERROR:", e)
        raise credentials_exception

    user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    print("USER FOUND:", user)

    if user is None:
        raise credentials_exception

    return user

def require_admin(
    current_user: User = Depends(get_current_user)
):

    if current_user.role != "admin":
        raise HTTPException(
            status_code=403,
            detail="Admin access required."
        )

    return current_user


def require_member(
    current_user: User = Depends(get_current_user)
):

    if current_user.role not in ["member", "admin"]:
        raise HTTPException(
            status_code=403,
            detail="Member access required."
        )

    return current_user