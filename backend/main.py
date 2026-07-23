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
from app.routes.admin import router as admin_router
from app.routes.event_registration import router as event_registration_router
from app.models.payment import Payment
from app.routes.payment import router as payment_router
from app.routes.ticket import router as ticket_router
from app.routes.founder_directory import router as founder_router
from app.routes.attendance import router as attendance_router
from app.routes.dashboard import router as dashboard_router
from app.routes.reports import router as reports_router
from app.routes.renewal import router as renewal_router
from app.routes.invoice import router as invoice_router
from app.routes.email import router as email_router
from app.scheduler.scheduler import scheduler
from app.models.contact import Contact
from app.routes.contact import router as contact_router
from app.models.blog import Blog
from app.routes.blog import router as blog_router
from app.models.gallery import Gallery
from app.routes.gallery import router as gallery_router
from app.models.audit_log import AuditLog
from app.routes.audit import router as audit_router
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI(
    title="Founder Networking Platform API",
    version="1.0.0"
)
origins = [
    "http://localhost:5173",      # React Dev
    "http://127.0.0.1:5173",      # Alternate localhost
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
#scheduler.start()
Base.metadata.create_all(bind=engine)

app.include_router(auth_router)
app.include_router(membership_plan_router)
app.include_router(membership_router)
app.include_router(admin_router)
app.include_router(event_router)
app.include_router(event_registration_router)
app.include_router(payment_router)
app.include_router(ticket_router)
app.include_router(attendance_router)
app.include_router(founder_router)
app.include_router(dashboard_router)
app.include_router(reports_router)
app.include_router(renewal_router)
app.include_router(invoice_router)
app.include_router(email_router)
app.include_router(contact_router)
app.include_router(blog_router)
app.include_router(gallery_router)
app.include_router(audit_router)  
@app.get("/")
def root():
    return {
        "message": "Founder Networking Platform API is Running 🚀"
    }