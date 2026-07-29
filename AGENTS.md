<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
# AGENTS.md

# BharatFix - AI Development Guide

Version: 1.0

This file contains instructions for AI coding agents (Codex, GPT, Claude, Cursor, etc.) working on BharatFix.

---

# Project Overview

BharatFix is a full-stack Municipality Complaint Management System built with modern technologies.

The application enables citizens to register complaints regarding municipal issues while allowing municipality officials to manage, assign, resolve, and track complaints efficiently.

The codebase consists of two independent projects:

```
bharatfix/
│
├── bharatfix-frontend/
│
└── bharatfix-backend-fixed/
```

The frontend and backend should remain loosely coupled and communicate exclusively through REST APIs.

Never mix frontend code into backend or vice versa.

---

# Tech Stack

## Frontend

- Next.js (App Router)
- TypeScript
- TailwindCSS
- Framer Motion
- React Hook Form
- Zod
- Axios
- Lucide Icons

## Backend

- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- MySQL
- Hibernate
- Maven

---

# Project Goals

The application should always prioritize

- Clean Architecture
- Scalability
- Security
- Maintainability
- Performance
- Accessibility
- Mobile Responsiveness

---

# High Level Architecture

Frontend

```
Pages
    ↓
Components
    ↓
Hooks
    ↓
Services/API Layer
    ↓
Spring Boot REST API
```

Backend

```
Controller
      ↓
Service
      ↓
Repository
      ↓
Database
```

Never skip layers.

Controllers must never directly access repositories.

---

# Folder Structure

## Frontend

```
app/
components/
hooks/
lib/
services/
types/
constants/
styles/
public/
```

Recommended component organization

```
components/

ui/
layout/
dashboard/
forms/
complaints/
admin/
shared/
animations/
```

---

## Backend

```
controller/

service/

service/impl/

repository/

entity/

dto/

config/

security/

exception/

util/

mapper/

```

---

# Coding Philosophy

Always prefer

Readable code > Clever code

Explicit code > Magic

Reusable code > Duplicate code

Composition > Inheritance

Small Components > Large Components

Small Services > God Classes

---

# AI Agent Responsibilities

Whenever making changes:

Understand existing architecture before modifying code.

Never rewrite large sections unnecessarily.

Preserve existing functionality.

Do not introduce breaking API changes without updating frontend.

Keep commits atomic.

---

# Before Writing Code

Always

1. Understand surrounding code.

2. Search for existing utilities.

3. Reuse existing abstractions.

4. Avoid duplicate logic.

---

# Frontend Rules

Use

Server Components whenever possible.

Client Components only when required.

Add

```
"use client";
```

only if necessary.

Never convert server components to client components unless required.

---

# React Rules

Prefer

Functional Components.

Hooks.

Composition.

Avoid class components.

---

# State Management

Use

useState

for local state.

Use Context only when necessary.

Avoid unnecessary prop drilling.

---

# Styling

Only TailwindCSS.

Never write inline styles unless dynamically generated.

Prefer utility classes.

Extract repeated patterns into reusable components.

---

# Animations

Use Framer Motion.

Animations should be

Fast

Subtle

Accessible

Avoid distracting animations.

---

# Component Rules

Each component should have one responsibility.

Avoid components longer than ~250 lines.

Split when necessary.

---

# Forms

Use

React Hook Form

+

Zod Validation

Never manually validate large forms.

---

# API Calls

Keep API logic inside

```
services/

or

lib/api
```

Never place Axios calls directly inside components.

---

# Backend Rules

Use layered architecture.

```
Controller

↓

Service

↓

Repository
```

Never violate this separation.

---

# Controllers

Responsibilities

- Receive request
- Validate request
- Return response

Nothing else.

No business logic.

---

# Services

Contain all business logic.

Services should be reusable.

---

# Repository

Only database operations.

No business logic.

---

# DTO

Never expose entity objects directly.

Always use DTOs.

---

# Entity Rules

Entities should

Contain relationships

Contain validation annotations

Avoid business logic

---

# Exception Handling

Use global exception handler.

Never return stack traces.

Return meaningful error messages.

---

# Security

Use JWT Authentication.

Never store passwords in plaintext.

Always hash passwords.

Never expose sensitive information.

Protect admin routes.

Protect municipality-only endpoints.

Validate authorization.

---

# API Design

RESTful naming

Good

```
GET /complaints

POST /complaints

GET /complaints/{id}

PUT /complaints/{id}

DELETE /complaints/{id}
```

Avoid

```
/getComplaints

/createComplaint

/deleteComplaint
```

---

# HTTP Status Codes

200 OK

201 Created

204 No Content

400 Bad Request

401 Unauthorized

403 Forbidden

404 Not Found

409 Conflict

500 Internal Server Error

---

# Database

Use proper normalization.

Avoid duplicate data.

Use foreign keys.

Index searchable columns.

Use migrations when applicable.

---

# Naming Conventions

Java

Classes

```
ComplaintService
```

Variables

```
complaintId
```

Methods

```
getComplaintById()
```

Constants

```
MAX_FILE_SIZE
```

---

TypeScript

Components

```
ComplaintCard.tsx
```

Hooks

```
useComplaints.ts
```

Utilities

```
formatDate.ts
```

Types

```
Complaint.ts
```

---

# API Response Format

Success

```json
{
    "success": true,
    "message": "Complaint created successfully",
    "data": {}
}
```

Failure

```json
{
    "success": false,
    "message": "Complaint not found",
    "errors": []
}
```

Keep responses consistent.

---

# Validation

Frontend validation

+

Backend validation

Never rely on frontend validation only.

---

# Error Handling

Show friendly error messages.

Never expose backend implementation.

Log internal errors.

---

# Logging

Backend

Use SLF4J.

Never use

```
System.out.println()
```

---

# Performance

Avoid unnecessary renders.

Memoize expensive computations.

Lazy load large components.

Optimize images.

Paginate large datasets.

---

# Accessibility

Use semantic HTML.

Add labels to inputs.

Keyboard navigation should work.

Buttons must be focusable.

Color should never be the only indicator.

---

# Responsive Design

Mobile First.

Support

Mobile

Tablet

Desktop

---

# Code Quality

Avoid

Magic numbers

Deep nesting

Large functions

Unused imports

Unused variables

Duplicate code

---

# Comments

Only comment

Why

not

What

Good

```java
// Prevent duplicate complaint submissions within 5 minutes.
```

Bad

```java
// Increment i
i++;
```

---

# Git Workflow

Never push directly to main.

Feature branches

```
feature/login

feature/dashboard

feature/complaints
```

Bug fixes

```
fix/jwt-expiry

fix/navbar
```

---

# Commit Messages

Use

```
feat:

fix:

refactor:

docs:

style:

test:

perf:

build:
```

Example

```
feat: implement complaint assignment API
```

---

# Testing

Backend

JUnit

Mockito

Frontend

React Testing Library

Test critical business logic.

---

# Documentation

Every public class should have JavaDoc.

Complex functions should explain intent.

---

# AI Modification Rules

Before changing any code:

Read related files.

Understand dependencies.

Minimize code changes.

Preserve formatting.

Reuse existing utilities.

Avoid introducing new libraries unless necessary.

---

# If Unsure

Never guess.

Inspect project structure.

Search existing implementations.

Maintain consistency.

---

# Forbidden Actions

Do NOT

Change project architecture without request.

Rename public APIs unnecessarily.

Break existing routes.

Duplicate utility functions.

Hardcode secrets.

Hardcode URLs.

Store credentials in code.

Disable security.

Ignore TypeScript errors.

Ignore compiler warnings.

---

# Environment Variables

Frontend

```
NEXT_PUBLIC_API_BASE_URL=
```

Backend

```
SPRING_DATASOURCE_URL=
SPRING_DATASOURCE_USERNAME=
SPRING_DATASOURCE_PASSWORD=
JWT_SECRET=
JWT_EXPIRATION=
```

Never commit .env files.

---

# Definition of Done

A task is complete only if

✓ Code compiles

✓ No lint errors

✓ No TypeScript errors

✓ No Spring Boot errors

✓ Responsive UI maintained

✓ Existing functionality preserved

✓ New functionality tested

✓ No duplicated code

✓ Documentation updated if necessary

✓ API contract preserved

---

# AI Behavior

When implementing a feature:

1. Analyze existing code.

2. Explain the plan briefly.

3. Make the smallest necessary changes.

4. Keep architecture consistent.

5. Verify imports.

6. Avoid unrelated refactoring.

7. Ensure frontend and backend remain synchronized.

The AI should behave like a senior full-stack engineer maintaining a production application rather than generating isolated code snippets.