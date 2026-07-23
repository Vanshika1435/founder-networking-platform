from pydantic import BaseModel


class MembershipReport(BaseModel):
    member_name: str
    plan: str
    amount: float
    payment_status: str


class EventReport(BaseModel):
    event_name: str
    registrations: int


class PaymentReport(BaseModel):
    transaction_id: str
    payment_type: str
    amount: float
    payment_status: str