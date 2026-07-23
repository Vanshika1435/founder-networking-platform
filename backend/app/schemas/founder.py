from pydantic import BaseModel


class FounderResponse(BaseModel):
    id: int
    name: str
    company_name: str | None = None
    designation: str | None = None
    industry: str | None = None
    city: str | None = None
    website: str | None = None
    linkedin: str | None = None
    bio: str | None = None
    company_logo: str | None = None
    profile_photo: str | None = None

    class Config:
        from_attributes = True