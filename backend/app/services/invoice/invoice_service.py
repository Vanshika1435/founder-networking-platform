import uuid

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.payment import Payment
from app.models.membership import Membership
from app.models.membership_plan import MembershipPlan
from app.models.user import User

from app.services.invoice.pdf_generator import generate_invoice_pdf


def generate_membership_invoice(
    membership_id: int,
    db: Session
):

    membership = (
        db.query(Membership)
        .filter(Membership.id == membership_id)
        .first()
    )

    if not membership:
        raise HTTPException(
            status_code=404,
            detail="Membership not found."
        )

    payment = (
        db.query(Payment)
        .filter(Payment.membership_id == membership.id)
        .first()
    )

    if not payment:
        raise HTTPException(
            status_code=404,
            detail="Payment not found."
        )

    user = (
        db.query(User)
        .filter(User.id == membership.user_id)
        .first()
    )

    plan = (
        db.query(MembershipPlan)
        .filter(MembershipPlan.id == membership.plan_id)
        .first()
    )

    invoice_number = "INV-" + uuid.uuid4().hex[:8].upper()

    pdf_path = generate_invoice_pdf(
        invoice_number=invoice_number,
        member_name=user.name,
        plan_name=plan.name,
        amount=payment.amount,
        payment_method=payment.payment_method,
        transaction_id=payment.transaction_id,
    )

    return {
        "invoice_number": invoice_number,
        "file_path": pdf_path
    }