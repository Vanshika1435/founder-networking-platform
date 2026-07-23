from typing import Optional

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from app.core.dependencies import require_member
from app.schemas.founder import FounderResponse
from app.services.founder.directory_service import (
    get_all_founders,
    get_founder_by_id,
    search_founders
)

router = APIRouter(
    prefix="/founders",
    tags=["Founder Directory"]
)


@router.get(
    "/",
    response_model=list[FounderResponse]
)
def all_founders(
    page: int = 1,
    limit: int = 10,
    db: Session = Depends(get_db),
    current_user=Depends(require_member)
):
    return get_all_founders(
        db,
        page,
        limit
    )


@router.get(
    "/search",
    response_model=list[FounderResponse]
)
def search(
    name: Optional[str] = None,
    company: Optional[str] = None,
    industry: Optional[str] = None,
    city: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user=Depends(require_member)
):
    return search_founders(
        db,
        name,
        company,
        industry,
        city
    )


@router.get(
    "/{founder_id}",
    response_model=FounderResponse
)
def founder_profile(
    founder_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_member)
):
    return get_founder_by_id(founder_id, db)