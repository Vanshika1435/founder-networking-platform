import uuid
from datetime import date, timedelta
from app.models.membership import Membership
from app.models.membership_plan import MembershipPlan
from fastapi import HTTPException
from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.payment import Payment
from app.models.user import User
from app.models.payment import Payment
from app.services.invoice.invoice_pdf import generate_invoice
from app.services.invoice.invoice_email import send_invoice
from app.schemas.payment import PaymentCreate


def create_payment(payment: PaymentCreate, db: Session):

    # ------------------------
    # Check User
    # ------------------------

    user = db.query(User).filter(
        User.id == payment.user_id
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found."
        )

    # ------------------------
    # Generate Transaction ID
    # ------------------------

    transaction_id = "TXN-" + uuid.uuid4().hex[:10].upper()

    # ------------------------
    # Create Payment
    # ------------------------

    new_payment = Payment(
        user_id=payment.user_id,
        membership_id=payment.membership_id,
        event_registration_id=payment.event_registration_id,
        amount=payment.amount,
        payment_type=payment.payment_type,
        payment_method=payment.payment_method,
        transaction_id=transaction_id,
        payment_status="Success"     # Dummy payment for now
    )

    db.add(new_payment)
    db.commit()
    db.refresh(new_payment)
    pdf_path = generate_invoice(
        transaction_id=transaction_id,
        customer_name=user.name,
        amount=new_payment.amount,
        payment_type=new_payment.payment_type
    )

    send_invoice(
        receiver_email=user.email,
        pdf_path=pdf_path
    )
    # ---------------------------------
    # Update Membership After Payment
    # ---------------------------------

    if payment.membership_id:

        membership = (
            db.query(Membership)
            .filter(Membership.id == payment.membership_id)
            .first()
        )

        if membership:

            plan = (
                db.query(MembershipPlan)
                .filter(MembershipPlan.id == membership.plan_id)
                .first()
            )

            membership.payment_status = "Paid"

            membership.start_date = date.today()

            membership.expiry_date = (
                date.today() +
                timedelta(days=plan.duration_months * 30)
            )

            db.commit()
    return {
        "message": "Payment Successful",
        "transaction_id": transaction_id,
        "payment_status": new_payment.payment_status,
        "amount": new_payment.amount
    }

def get_all_payments(db: Session):
    return db.query(Payment).all()


def get_payment_by_id(payment_id: int, db: Session):

    payment = (
        db.query(Payment)
        .filter(Payment.id == payment_id)
        .first()
    )

    if not payment:
        raise HTTPException(
            status_code=404,
            detail="Payment not found."
        )

    return payment