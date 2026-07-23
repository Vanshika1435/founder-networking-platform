from datetime import date, timedelta

from sqlalchemy.orm import Session

from database import SessionLocal

from app.models.membership import Membership
from app.models.user import User

from app.services.email.email_service import send_email


def membership_reminder():

    db: Session = SessionLocal()

    today = date.today()

    reminder_days = [30, 15, 7, 1]

    memberships = db.query(Membership).all()

    for membership in memberships:

        if membership.expiry_date is None:
            continue

        remaining_days = (
            membership.expiry_date - today
        ).days

        if remaining_days in reminder_days:

            user = (
                db.query(User)
                .filter(User.id == membership.user_id)
                .first()
            )

            send_email(
                receiver_email=user.email,
                subject="Membership Renewal Reminder",
                body=(
                    f"Hello {user.name},\n\n"
                    f"Your membership will expire in "
                    f"{remaining_days} day(s).\n\n"
                    "Please renew your membership.\n\n"
                    "Founder Networking Platform"
                )
            )

    db.close()