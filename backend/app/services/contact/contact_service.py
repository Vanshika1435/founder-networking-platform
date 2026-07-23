from sqlalchemy.orm import Session

from app.models.contact import Contact
from app.schemas.contact import ContactCreate
from app.services.email.email_service import send_email
from app.core.config import settings

def submit_contact(contact: ContactCreate, db: Session):

    new_message = Contact(
        name=contact.name,
        email=contact.email,
        phone=contact.phone,
        subject=contact.subject,
        message=contact.message
    )

    db.add(new_message)
    db.commit()
    db.refresh(new_message)

    # -----------------------------
    # Confirmation Email to Visitor
    # -----------------------------

    send_email(
        receiver_email=contact.email,
        subject="We received your inquiry",
        body=f"""
Hello {contact.name},

Thank you for contacting Founder Networking Platform.

We have received your message regarding:

{contact.subject}

Our team will contact you soon.

Regards,
Founder Networking Platform
"""
    )

    # -----------------------------
    # Notification Email to Admin
    # -----------------------------

    send_email(
        rreceiver_email=settings.ADMIN_EMAIL,   # <-- change if admin email is different
        subject="New Contact Form Submission",
        body=f"""
A new inquiry has been received.

Name: {contact.name}

Email: {contact.email}

Phone: {contact.phone}

Subject: {contact.subject}

Message:

{contact.message}
"""
    )

    return {
        "message": "Your inquiry has been submitted successfully."
    }


def get_all_messages(db: Session):

    return (
        db.query(Contact)
        .order_by(Contact.created_at.desc())
        .all()
    )