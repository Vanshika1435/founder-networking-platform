from datetime import date
from pydantic import BaseModel


class MembershipCreate(BaseModel):
    user_id: int
    plan_id: int


class MembershipResponse(BaseModel):
    id: int
    user_id: int
    plan_id: int
    status: str
    payment_status: str
    start_date: date | None
    expiry_date: date | None

    class Config:
        from_attributes = True