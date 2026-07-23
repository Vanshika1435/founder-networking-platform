from sqlalchemy.orm import Session

from app.models.audit_log import AuditLog


def log_action(
    user_email: str,
    action: str,
    module: str,
    db: Session
):

    log = AuditLog(
        user_email=user_email,
        action=action,
        module=module
    )

    db.add(log)
    db.commit()