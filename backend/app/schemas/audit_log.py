from datetime import datetime
from pydantic import BaseModel


class AuditLogResponse(BaseModel):
    id: int
    user_email: str
    action: str
    module: str
    created_at: datetime

    class Config:
        from_attributes = True