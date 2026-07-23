from fastapi import APIRouter

from app.services.email.email_service import send_email

router = APIRouter(
    prefix="/email",
    tags=["Email Test"]
)


@router.get("/test")
def test_email():

    send_email(
        receiver_email="53vnshii@gmail.com",
        subject="Founder Platform Test",
        body="Congratulations! Your email service is working."
    )

    return {
        "message": "Email sent successfully."
    }