import os
import qrcode

QR_FOLDER = "generated/qr_codes"


def generate_qr(ticket_number: str):

    os.makedirs(QR_FOLDER, exist_ok=True)

    qr = qrcode.QRCode(
        version=1,
        box_size=10,
        border=4
    )

    qr.add_data(ticket_number)
    qr.make(fit=True)

    image = qr.make_image(
        fill_color="black",
        back_color="white"
    )

    file_path = os.path.join(
        QR_FOLDER,
        f"{ticket_number}.png"
    )

    image.save(file_path)

    return file_path