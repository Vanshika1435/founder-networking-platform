# Founder Networking Platform & Membership Management System

## Project Overview

Founder Networking Platform is a web-based application designed to manage founder memberships, networking events, payments, event registrations, founder directory, blogs, gallery, reports, and community engagement.

This system provides separate functionalities for administrators and members, enabling efficient community management, event participation, and membership handling.

This project was developed as an internship project based on the Software Requirement Specification (SRS) provided by the organization.

---

## Objectives

- Manage founder memberships.
- Organize networking events.
- Enable founder discovery and collaboration.
- Automate payments and invoice generation.
- Generate QR-based event tickets.
- Provide reporting and analytics.
- Maintain audit logs for administrative actions.

---

## Features

### Authentication & Authorization
- User Registration
- JWT Authentication
- Role-Based Access Control
- Admin Approval System

### Membership Management
- Membership Plans
- Purchase Membership
- Membership Renewal
- Membership Status Tracking

### Event Management
- Create Events
- Update Events
- Delete Events
- Event Registration
- Capacity Validation

### Ticketing
- QR Code Generation
- PDF Ticket Generation
- Email Ticket Delivery

### Payment Module
- Membership Payment
- Event Payment
- Invoice PDF Generation
- Email Invoice

### Founder Directory
- Search by:
  - Name
  - Company
  - Industry
  - City

### Community Features
- Blog Module
- Gallery Module
- Contact Module

### Administration
- Dashboard
- Reports
- Audit Logs
- Reminder Emails

---

## Tech Stack

### Backend
- FastAPI
- SQLAlchemy
- PostgreSQL
- Pydantic

### Authentication
- JWT
- Passlib

### Email Services
- SMTP

### PDF & QR
- ReportLab
- qrcode

### Scheduler
- APScheduler

---

## Project Structure

```text
backend/
│
├── app/
│   ├── core/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── schemas/
│   ├── services/
│   ├── scheduler/
│   └── utils/
│
├── main.py
├── database.py
├── requirements.txt
├── .env
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone <repository_url>
```

### Create Virtual Environment

```bash
python -m venv .venv
```

### Activate Environment

```bash
.venv\Scripts\activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Run Server

```bash
uvicorn main:app --reload
```

---

## API Documentation

Swagger UI:

```text
http://127.0.0.1:8000/docs
```

---

## Future Enhancements

- Real Payment Gateway Integration
- Mobile Application
- AI-Based Founder Recommendations
- Event Analytics Dashboard
- Chat System

---

## Developed As

Internship Project

Founder Networking Platform & Membership Management System