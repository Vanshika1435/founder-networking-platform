from pydantic import BaseModel


class InvoiceResponse(BaseModel):
    invoice_number: str
    file_path: str