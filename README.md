Complaint Management System
A Complaint Management System built with Spring Boot (Java) for backend, React for frontend, and MySQL as the database. It allows users to register complaints, track their status, and for staff/admins to allocate and resolve complaints efficiently.

Features
User registration and login

Complaint registration with Google Maps location pinning

Staff allocation and workload tracking

Status updates (Pending, In Progress, Resolved)

Role-based access (User, Staff, Admin)

Email notifications (optional)

Clean RESTful APIs for easy integration

Tech Stack
Backend: Java, Spring Boot, Spring Data JPA, Spring Security, JWT

Frontend: React, Axios, TailwindCSS (or Material UI)

Database: MySQL

Map Integration: Google Maps API

/backend
    ├── src/main/java/com/complaintsystem
    │       ├── controller
    │       ├── dto
    │       ├── entity
    │       ├── repository
    │       ├── service
    │       ├── exception
    │       └── security
/frontend
    ├── src
    │   ├── components
    │   ├── pages
    │   ├── services
    │   └── utils

API Endpoints
POST /api/auth/register - Register user

POST /api/auth/login - Login user

POST /api/complaints - Register complaint

GET /api/complaints/{id} - Get complaint details

PUT /api/complaints/{id}/status - Update complaint status

GET /api/staff - Get staff workload for allocation

Additional CRUD endpoints for admin as needed

Database Schema
User Table: stores user credentials, roles

Complaint Table: stores complaint details with status, location coordinates, and timestamps

Staff Table: stores staff details and allocation count

