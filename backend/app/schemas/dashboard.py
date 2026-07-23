from pydantic import BaseModel


class DashboardResponse(BaseModel):
    total_members: int
    approved_members: int
    pending_members: int

    total_events: int
    upcoming_events: int

    total_event_registrations: int

    membership_revenue: float
    event_revenue: float
    total_revenue: float