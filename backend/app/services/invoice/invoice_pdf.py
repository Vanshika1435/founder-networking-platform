import os

from reportlab.lib.units import inch
from reportlab.pdfgen import canvas


def generate_invoice(
    transaction_id,
    customer_name,
    amount,
    payment_type
):

    os.makedirs("invoices", exist_ok=True)

    pdf_path = f"invoices/{transaction_id}.pdf"

    c = canvas.Canvas(pdf_path)

    c.setFont("Helvetica-Bold", 20)
    c.drawString(170, 800, "PAYMENT INVOICE")

    c.setFont("Helvetica", 13)

    c.drawString(60, 740, f"Transaction ID : {transaction_id}")
    c.drawString(60, 710, f"Customer : {customer_name}")
    c.drawString(60, 680, f"Payment Type : {payment_type}")
    c.drawString(60, 650, f"Amount : ₹{amount}")

    c.line(50, 620, 550, 620)

    c.drawString(60, 590, "Status : SUCCESS")

    c.drawString(
        60,
        540,
        "Thank you for using Founder Networking Platform."
    )

    c.save()

    return pdf_path