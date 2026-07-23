from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.membership import Membership
from app.models.membership_plan import MembershipPlan
from app.models.user import User
from app.models.payment import Payment
from app.models.event import Event
from app.models.event_registration import EventRegistration


# ---------------------------------------
# Membership Report
# ---------------------------------------

def membership_report(db: Session):

    report = (
        db.query(
            User.name,
            MembershipPlan.name,
            Membership.payment_status,
            Payment.amount
        )
        .join(Membership, Membership.user_id == User.id)
        .join(
            MembershipPlan,
            Membership.plan_id == MembershipPlan.id
        )
        .outerjoin(
            Payment,
            Membership.id == Payment.membership_id
        )
        .all()
    )

    return [
        {
            "member_name": row[0],
            "plan": row[1],
            "payment_status": row[2],
            "amount": row[3] if row[3] else 0
        }
        for row in report
    ]


# ---------------------------------------
# Event Report
# ---------------------------------------

def event_report(db: Session):

    report = (
        db.query(
            Event.title,
            func.count(EventRegistration.id)
        )
        .outerjoin(
            EventRegistration,
            Event.id == EventRegistration.event_id
        )
        .group_by(Event.id, Event.title)
        .all()
    )

    return [
        {
            "event_name": row[0],
            "registrations": row[1]
        }
        for row in report
    ]


# ---------------------------------------
# Payment Report
# ---------------------------------------

def payment_report(db: Session):

    payments = db.query(Payment).all()

    return [
        {
            "transaction_id": payment.transaction_id,
            "payment_type": payment.payment_type,
            "amount": payment.amount,
            "payment_status": payment.payment_status
        }
        for payment in payments
    ]