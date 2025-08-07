# BharatFix - Municipal Complaint Management System

**BharatFix** is a full-stack web application designed to streamline the complaint resolution process between citizens and municipalities. It allows users to register and report civic issues, enables municipal departments to manage and resolve those issues, and provides administrators with tools for oversight and coordination.

## Key Features

### User Roles

**Guest Users**
- Submit one complaint
- Must register to submit more complaints

**Registered Users**
- Submit and track multiple complaints
- View complaint status
- Give feedback after resolution

**Admins**
- Allocate complaints to departments
- Manage users and departments
- Monitor complaint resolution
- View feedback reports

**Department Staff**
- View allocated complaints
- Upload resolution images and remarks
- Mark complaints as resolved

## Technology Stack

### Backend
- Java 17
- Spring Boot
- Spring Security with JWT Authentication
- MySQL
- Hibernate (JPA)

### Frontend
- React with Vite
- Material UI
- Axios
- Google Maps API (for location tagging)

## Security

- JWT-based authentication
- Role-based authorization
- Password encryption using BCrypt
- OTP verification for guest users

## Project Modules

- User registration and login
- OTP-based guest complaint submission
- Complaint creation, tracking, and management
- Admin dashboard for complaint allocation and user/department management
- Department staff dashboard for resolution uploads
- Feedback system for closed complaints
- Location tagging using Google Maps

## Directory Structure

### Backend (Spring Boot)

bharatfix/
├── controller/
├── dto/
├── entities/
├── repository/
├── service/
├── exceptions/
├── security/
├── config/
└── utils/

shell
Copy code

### Frontend (React + Vite)

bharatfix-frontend/
├── components/
├── pages/
├── routes/
├── services/
└── utils/

shell
Copy code

## Getting Started

### Backend

```bash
cd bharatfix
mvn clean install
Run the application using your IDE or:

bash
Copy code
mvn spring-boot:run
Frontend
bash
Copy code
cd bharatfix-frontend
npm install
npm run dev
API Endpoints Overview
POST /api/auth/register – Register a new user

POST /api/auth/login – Authenticate and receive a JWT

POST /api/complaints – Submit a new complaint

GET /api/complaints/user – Get logged-in user's complaints

POST /api/admin/allocate – Admin assigns complaint to department

POST /api/department/resolve – Department marks complaint as resolved

POST /api/feedback – Submit feedback on a resolved complaint
