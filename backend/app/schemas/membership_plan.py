from pydantic import BaseModel


class MembershipPlanCreate(BaseModel):
    name: str
    description: str
    duration_months: int
    price: float


class MembershipPlanResponse(BaseModel):
    id: int
    name: str
    description: str
    duration_months: int
    price: float
    is_active: bool

    class Config:
        from_attributes = True