from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import html
import logging
import resend
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# MongoDB connection (5s timeout so the form doesn't hang 30s if Mongo is down)
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url, serverSelectionTimeoutMS=5000)
db = client[os.environ['DB_NAME']]

# Set Resend API Key
resend.api_key = os.environ.get("RESEND_API_KEY")

# Create the main app
app = FastAPI()

# Single, clean CORS Middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://saachiinfosofttechnology.netlify.app",
        "http://localhost:3000",
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class ContactMessageCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: str = Field(min_length=5, max_length=200)
    phone: str = Field(min_length=7, max_length=30)
    service: str = Field(min_length=2, max_length=120)
    message: str = Field(min_length=10, max_length=5000)


class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    service: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class NewsletterCreate(BaseModel):
    email: str = Field(min_length=5, max_length=200)


@api_router.get("/")
async def root():
    return {"message": "Saachi Infosoft Technologies API is running"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(input: ContactMessageCreate):
    msg = ContactMessage(**input.model_dump())
    doc = msg.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()

    # 1. Save submission to MongoDB (a failure here must NOT block the email)
    db_saved = False
    try:
        await db.contact_messages.insert_one(doc)
        db_saved = True
    except Exception:
        logger.exception("Failed to save contact message to MongoDB")

    # 2. Send email notification via Resend
    email_sent = False
    try:
        to_email = os.environ.get("NOTIFICATION_EMAIL", "saachiinfosofttechnologies@gmail.com")

        # Escape user input so visitors can't inject HTML into the email
        name = html.escape(input.name)
        email = html.escape(input.email)
        phone = html.escape(input.phone)
        service = html.escape(input.service)
        details = html.escape(input.message).replace("\n", "<br>")

        # Resend SDK is synchronous, so run it in a thread
        await asyncio.to_thread(resend.Emails.send, {
            "from": "Saachi Infosoft <onboarding@resend.dev>",
            "to": [to_email],
            "reply_to": input.email,
            "subject": f"New Project Lead: {input.name} ({input.service})",
            "html": f"""
                <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                    <h2 style="color: #dc2626;">New Contact Form Submission</h2>
                    <p><strong>Name:</strong> {name}</p>
                    <p><strong>Email:</strong> <a href="mailto:{email}">{email}</a></p>
                    <p><strong>Phone:</strong> <a href="tel:{phone}">{phone}</a></p>
                    <p><strong>Service Requested:</strong> {service}</p>
                    <p><strong>Project Details:</strong></p>
                    <blockquote style="background: #f9f9f9; border-left: 4px solid #dc2626; padding: 12px 16px; margin: 0;">
                        {details}
                    </blockquote>
                </div>
            """
        })
        email_sent = True
    except Exception:
        logger.exception("Failed to send email via Resend")

    # Only return an error if BOTH the save and the email failed
    if not db_saved and not email_sent:
        raise HTTPException(
            status_code=503,
            detail="Could not process your message. Please try again later.",
        )

    return msg


@api_router.get("/contact", response_model=List[ContactMessage])
async def list_contact_messages():
    docs = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(200)
    return [ContactMessage(**d) for d in docs]


@api_router.post("/newsletter")
async def subscribe_newsletter(input: NewsletterCreate):
    email = input.email.strip().lower()
    existing = await db.newsletter_subscribers.find_one({"email": email})
    if existing:
        return {"status": "ok", "already_subscribed": True, "message": "You're already subscribed."}
    await db.newsletter_subscribers.insert_one({
        "id": str(uuid.uuid4()),
        "email": email,
        "created_at": datetime.now(timezone.utc).isoformat(),
    })
    return {"status": "ok", "already_subscribed": False, "message": "Subscribed successfully."}


# Include the router in the main app
app.include_router(api_router)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()