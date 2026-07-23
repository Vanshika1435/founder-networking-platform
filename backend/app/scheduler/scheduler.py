from apscheduler.schedulers.background import BackgroundScheduler

from app.services.reminders.reminder_service import (
    membership_reminder
)

scheduler = BackgroundScheduler()

scheduler.add_job(
    membership_reminder,
    trigger="interval",
    minutes=1
)