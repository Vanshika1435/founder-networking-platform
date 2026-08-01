from datetime import date, datetime
from pydantic import BaseModel


# -----------------------------
# Recent Member
# -----------------------------
class RecentMember(BaseModel):
    id: int
    name: str
    email: str
    approval_status: str
    created_at: datetime

    class Config:
        from_attributes = True


# -----------------------------
# Recent Payment
# -----------------------------
class RecentPayment(BaseModel):
    id: int
    transaction_id: str
    amount: float
    payment_type: str
    payment_status: str
    created_at: datetime

    class Config:
        from_attributes = True


# -----------------------------
# Recent Event
# -----------------------------
class RecentEvent(BaseModel):
    id: int
    title: str
    event_date: date
    venue: str

    class Config:
        from_attributes = True


# -----------------------------
# Dashboard Response
# -----------------------------
class DashboardResponse(BaseModel):

    # Members
    total_members: int
    approved_members: int
    pending_members: int
    suspended_members: int

    # Membership
    active_memberships: int
    expired_memberships: int
    renewals_due: int

    # Events
    total_events: int
    upcoming_events: int
    total_event_registrations: int
    attended_count: int

    # Revenue
    membership_revenue: float
    event_revenue: float
    total_revenue: float

    # Recent Activity
    recent_members: list[RecentMember]
    recent_payments: list[RecentPayment]
    recent_events: list[RecentEvent]