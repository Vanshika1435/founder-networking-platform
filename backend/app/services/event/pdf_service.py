import os

from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image
from reportlab.lib.styles import getSampleStyleSheet

PDF_FOLDER = "generated/tickets"


def generate_pdf(
    ticket_number,
    attendee_name,
    event_name,
    venue,
    event_date,
    event_time,
    qr_path
):

    os.makedirs(PDF_FOLDER, exist_ok=True)

    pdf_path = os.path.join(
        PDF_FOLDER,
        f"{ticket_number}.pdf"
    )

    doc = SimpleDocTemplate(pdf_path)

    styles = getSampleStyleSheet()

    story = []

    story.append(
        Paragraph(
            "<b>Founder Networking Platform</b>",
            styles["Title"]
        )
    )

    story.append(Spacer(1,20))

    story.append(
        Paragraph(f"<b>Ticket Number:</b> {ticket_number}", styles["Normal"])
    )

    story.append(
        Paragraph(f"<b>Attendee:</b> {attendee_name}", styles["Normal"])
    )

    story.append(
        Paragraph(f"<b>Event:</b> {event_name}", styles["Normal"])
    )

    story.append(
        Paragraph(f"<b>Venue:</b> {venue}", styles["Normal"])
    )

    story.append(
        Paragraph(f"<b>Date:</b> {event_date}", styles["Normal"])
    )

    story.append(
        Paragraph(f"<b>Time:</b> {event_time}", styles["Normal"])
    )

    story.append(Spacer(1,20))

    story.append(
        Image(
            qr_path,
            width=170,
            height=170
        )
    )

    doc.build(story)

    return pdf_path