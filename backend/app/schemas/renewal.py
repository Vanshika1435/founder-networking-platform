from pydantic import BaseModel


class MembershipRenewRequest(BaseModel):
    membership_id: int
    payment_method: str