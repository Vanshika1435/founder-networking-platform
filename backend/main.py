from fastapi import FastAPI
from app.models.event import Event
from database import Base, engine
from app.models.user import User
from app.routes.auth import router as auth_router
from app.models.membership_plan import MembershipPlan
from app.models.membership import Membership
from app.routes.membership_plan import router as membership_plan_router
from app.routes.membership import router as membership_router
from app.routes.event import router as event_router
from app.models.event_registration import EventRegistration
app = FastAPI(
    title="Founder Networking Platform API",
    version="1.0.0"
)

Base.metadata.create_all(bind=engine)

app.include_router(auth_router)
app.include_router(membership_plan_router)
app.include_router(membership_router)
app.include_router(event_router)
@app.get("/")
def root():
    return {
        "message": "Founder Networking Platform API is Running 🚀"
    }