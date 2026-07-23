from datetime import datetime
from pydantic import BaseModel


class PaymentCreate(BaseModel):
    user_id: int
    amount: float
    payment_type: str      # Membership / Event
    payment_method: str    # UPI / Card / Wallet
    membership_id: int | None = None
    event_registration_id: int | None = None


class PaymentResponse(BaseModel):
    id: int
    transaction_id: str
    payment_status: str
    amount: float
    payment_method: str
    payment_type: str
    created_at: datetime

    class Config:
        from_attributes = True