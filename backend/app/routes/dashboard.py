from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db

from app.schemas.dashboard import DashboardResponse
from app.services.dashboard.dashboard_service import get_dashboard
from app.core.dependencies import require_admin
router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get(
    "/",
    response_model=DashboardResponse
)
def dashboard(
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):
    return get_dashboard(db)