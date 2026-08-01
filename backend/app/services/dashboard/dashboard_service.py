from datetime import date, timedelta

from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.user import User
from app.models.event import Event
from app.models.event_registration import EventRegistration
from app.models.payment import Payment
from app.models.membership import Membership


def get_dashboard(db: Session):

    today = date.today()

    # ------------------------
    # Members
    # ------------------------

    total_members = (
        db.query(User)
        .filter(User.role == "member")
        .count()
    )

    approved_members = (
        db.query(User)
        .filter(
            User.role == "member",
            User.approval_status == "Approved",
            User.is_active == True
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

    suspended_members = (
        db.query(User)
        .filter(
            User.role == "member",
            User.is_active == False
        )
        .count()
    )

    # ------------------------
    # Memberships
    # ------------------------

    active_memberships = (
        db.query(Membership)
        .filter(Membership.expiry_date >= today)
        .count()
    )

    expired_memberships = (
        db.query(Membership)
        .filter(Membership.expiry_date < today)
        .count()
    )

    renewals_due = (
        db.query(Membership)
        .filter(
            Membership.expiry_date >= today,
            Membership.expiry_date <= today + timedelta(days=30)
        )
        .count()
    )

    # ------------------------
    # Events
    # ------------------------

    total_events = db.query(Event).count()

    upcoming_events = (
        db.query(Event)
        .filter(Event.event_date >= today)
        .count()
    )

    total_event_registrations = (
        db.query(EventRegistration)
        .count()
    )

    attended_count = (
        db.query(EventRegistration)
        .filter(EventRegistration.attendance == True)
        .count()
    )

    # ------------------------
    # Revenue
    # ------------------------

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

    total_revenue = membership_revenue + event_revenue

    # ------------------------
    # Recent Lists
    # ------------------------

    recent_members = (
        db.query(User)
        .order_by(User.created_at.desc())
        .limit(5)
        .all()
    )

    recent_payments = (
        db.query(Payment)
        .order_by(Payment.created_at.desc())
        .limit(5)
        .all()
    )

    recent_events = (
        db.query(Event)
        .order_by(Event.event_date.desc())
        .limit(5)
        .all()
    )

    return {

        "total_members": total_members,

        "approved_members": approved_members,

        "pending_members": pending_members,

        "suspended_members": suspended_members,

        "active_memberships": active_memberships,

        "expired_memberships": expired_memberships,

        "renewals_due": renewals_due,

        "total_events": total_events,

        "upcoming_events": upcoming_events,

        "total_event_registrations": total_event_registrations,

        "attended_count": attended_count,

        "membership_revenue": membership_revenue,

        "event_revenue": event_revenue,

        "total_revenue": total_revenue,

        "recent_members": recent_members,

        "recent_payments": recent_payments,

        "recent_events": recent_events

    }
