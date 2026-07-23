from datetime import date

from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.user import User
from app.models.event import Event
from app.models.event_registration import EventRegistration
from app.models.payment import Payment


def get_dashboard(db: Session):

    total_members = (
        db.query(User)
        .filter(User.role == "member")
        .count()
    )

    approved_members = (
        db.query(User)
        .filter(
            User.role == "member",
            User.approval_status == "Approved"
        )
        .count()
    )

    pending_members = (
        db.query(User)
        .filter(
            User.role == "member",
            User.approval_status == "Pending"
        )
        .count()
    )

    total_events = db.query(Event).count()

    upcoming_events = (
        db.query(Event)
        .filter(Event.event_date >= date.today())
        .count()
    )

    total_event_registrations = (
        db.query(EventRegistration)
        .count()
    )

    membership_revenue = (
        db.query(func.sum(Payment.amount))
        .filter(Payment.payment_type == "Membership")
        .scalar()
        or 0
    )

    event_revenue = (
        db.query(func.sum(Payment.amount))
        .filter(Payment.payment_type == "Event")
        .scalar()
        or 0
    )

    return {
        "total_members": total_members,
        "approved_members": approved_members,
        "pending_members": pending_members,
        "total_events": total_events,
        "upcoming_events": upcoming_events,
        "total_event_registrations": total_event_registrations,
        "membership_revenue": membership_revenue,
        "event_revenue": event_revenue,
        "total_revenue": membership_revenue + event_revenue
    }