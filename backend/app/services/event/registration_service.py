from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.services.audit.audit_service import log_action
from app.models.user import User
from app.models.event import Event
from app.models.event_registration import EventRegistration
from app.services.email.email_service import send_email
from app.schemas.event_registration import EventRegistrationCreate
from app.services.event.pdf_service import generate_pdf
from app.services.event.qr_service import generate_qr


def generate_ticket_number(db: Session):

    last_registration = (
        db.query(EventRegistration)
        .order_by(EventRegistration.id.desc())
        .first()
    )

    if last_registration:
        next_number = last_registration.id + 1
    else:
        next_number = 1

    return f"EVT2026{next_number:06d}"


def register_event(
    registration: EventRegistrationCreate,
    db: Session
):

    # -------------------------
    # Check User
    # -------------------------

    user = (
        db.query(User)
        .filter(User.id == registration.user_id)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found."
        )

    if user.approval_status != "Approved":
        raise HTTPException(
            status_code=403,
            detail="User is not approved."
        )

    # -------------------------
    # Check Event
    # -------------------------

    event = (
        db.query(Event)
        .filter(Event.id == registration.event_id)
        .first()
    )

    if not event:
        raise HTTPException(
            status_code=404,
            detail="Event not found."
        )

    # -------------------------
    # Duplicate Registration
    # -------------------------

    existing = (
        db.query(EventRegistration)
        .filter(
            EventRegistration.user_id == registration.user_id,
            EventRegistration.event_id == registration.event_id
        )
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="You are already registered for this event."
        )

    # -------------------------
    # Capacity Check
    # -------------------------

    total_registered = (
        db.query(EventRegistration)
        .filter(
            EventRegistration.event_id == registration.event_id
        )
        .count()
    )

    if total_registered >= event.capacity:
        raise HTTPException(
            status_code=400,
            detail="Event is full."
        )

    # -------------------------
    # Generate Ticket Number
    # -------------------------

    ticket_number = generate_ticket_number(db)

    # -------------------------
    # Generate QR Code
    # -------------------------

    qr_path = generate_qr(ticket_number)
    pdf_path = generate_pdf(
        ticket_number=ticket_number,
        attendee_name=user.name,
        event_name=event.title,
        venue=event.venue,
        event_date=event.event_date,
        event_time=event.event_time,
        qr_path=qr_path
    )
    # -------------------------
    # Send Ticket Email
    # -------------------------

    send_email(
        receiver_email=user.email,
        subject="Your Event Ticket",
        body=f"""
    Hello {user.name},

    Your registration has been confirmed.

    Event : {event.title}

    Venue : {event.venue}

    Date : {event.event_date}

    Time : {event.event_time}

    Ticket Number : {ticket_number}

    Your ticket PDF is attached with this email.

    Thank you for registering.
    """,
        attachment_path=pdf_path
    )
        # -------------------------
    # Save Registration
    # -------------------------

    new_registration = EventRegistration(
        user_id=registration.user_id,
        event_id=registration.event_id,
        ticket_number=ticket_number,
        qr_code_path=qr_path,
        pdf_ticket_path=pdf_path,
        attendance=False
    )
    db.add(new_registration)
    db.commit()
    db.refresh(new_registration)
    log_action(
        user_email=user.email,
        action=f"Registered for {event.title}",
        module="Events",
        db=db
    )
    return {
        "message": "Event Registered Successfully",
        "registration_id": new_registration.id,
        "ticket_number": ticket_number,
        "qr_code": qr_path,
        "pdf_ticket": pdf_path,
        "event": event.title,
        "user": user.name
    }