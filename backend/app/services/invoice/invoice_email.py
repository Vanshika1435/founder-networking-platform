from email.message import EmailMessage
import smtplib

from app.core.config import settings


def send_invoice(
    receiver_email: str,
    pdf_path: str
):

    msg = EmailMessage()

    msg["Subject"] = "Founder Networking Platform - Payment Invoice"
    msg["From"] = settings.EMAIL_ADDRESS
    msg["To"] = receiver_email

    msg.set_content(
        "Thank you for your payment.\n\n"
        "Your invoice is attached with this email."
    )

    with open(pdf_path, "rb") as f:
        pdf_data = f.read()

    msg.add_attachment(
        pdf_data,
        maintype="application",
        subtype="pdf",
        filename="Invoice.pdf"
    )

    with smtplib.SMTP(
        settings.SMTP_SERVER,
        settings.SMTP_PORT
    ) as smtp:

        smtp.starttls()

        smtp.login(
            settings.EMAIL_ADDRESS,
            settings.EMAIL_PASSWORD
        )

        smtp.send_message(msg)