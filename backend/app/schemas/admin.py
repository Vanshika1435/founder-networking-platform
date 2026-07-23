from pydantic import BaseModel


class MemberResponse(BaseModel):
    id: int
    name: str
    email: str
    company_name: str | None = None
    designation: str | None = None
    industry: str | None = None
    city: str | None = None
    approval_status: str

    class Config:
        from_attributes = True