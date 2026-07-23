import os
import smtplib

from email.message import EmailMessage

from app.core.config import settings


def send_email(
    receiver_email: str,
    subject: str,
    body: str,
    attachment_path: str = None
):

    msg = EmailMessage()

    msg["Subject"] = subject
    msg["From"] = settings.EMAIL_ADDRESS
    msg["To"] = receiver_email

    msg.set_content(body)

    # -------------------------
    # Attach PDF (Optional)
    # -------------------------

    if attachment_path:

        with open(attachment_path, "rb") as file:

            msg.add_attachment(
                file.read(),
                maintype="application",
                subtype="pdf",
                filename=os.path.basename(attachment_path)
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