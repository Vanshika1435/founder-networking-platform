import os
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)
from reportlab.lib.styles import getSampleStyleSheet


def generate_invoice_pdf(
    invoice_number: str,
    member_name: str,
    plan_name: str,
    amount: float,
    payment_method: str,
    transaction_id: str,
):

    os.makedirs("uploads/invoices", exist_ok=True)

    pdf_path = f"uploads/invoices/{invoice_number}.pdf"

    doc = SimpleDocTemplate(pdf_path)

    styles = getSampleStyleSheet()

    elements = []

    elements.append(
        Paragraph("<b>Founder Networking Platform</b>", styles["Title"])
    )

    elements.append(Spacer(1, 0.25 * inch))

    elements.append(
        Paragraph(f"<b>Invoice No:</b> {invoice_number}", styles["Normal"])
    )

    elements.append(
        Paragraph(f"<b>Member:</b> {member_name}", styles["Normal"])
    )

    elements.append(
        Paragraph(f"<b>Membership Plan:</b> {plan_name}", styles["Normal"])
    )

    elements.append(
        Paragraph(f"<b>Amount:</b> ₹{amount}", styles["Normal"])
    )

    elements.append(
        Paragraph(f"<b>Payment Method:</b> {payment_method}", styles["Normal"])
    )

    elements.append(
        Paragraph(f"<b>Transaction ID:</b> {transaction_id}", styles["Normal"])
    )

    elements.append(
        Paragraph("<b>Status:</b> Paid", styles["Normal"])
    )

    doc.build(elements)

    return pdf_path