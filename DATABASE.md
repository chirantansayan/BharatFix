# Database Design

## Overview

BharatFix uses a relational MySQL database designed to efficiently manage municipal complaints, user accounts, department assignments, complaint history, and team allocation.

The schema follows normalization principles by separating users, complaints, departments, teams, allocations, and status updates into independent tables connected through foreign keys.

---

# Entity Relationship Diagram

> Export the latest EER diagram from MySQL Workbench and place it inside the `docs/` folder.

```text
docs/
    ER_Diagram.svg
```

Then reference it here:

```md
![ER Diagram](docs/ER_Diagram.svg)
```

---

# Database Tables

## 1. users

Stores authenticated users of the system.

### Purpose

- Citizen accounts
- Municipality employees
- Administrators
- Officers

### Primary Key

- `user_id`

### Important Fields

| Column | Description |
|----------|-------------|
| user_id | Unique user identifier |
| username | Login username |
| email | Email address |
| password | BCrypt hashed password |
| role | USER / OFFICER / ADMIN |
| created_at | Account creation timestamp |

---

## 2. guest_users

Stores anonymous users who submit complaints without registration.

### Purpose

Allows citizens to report issues without creating an account.

### Primary Key

- `id`

### Important Fields

| Column | Description |
|----------|-------------|
| email | Guest email |
| ip_address | IP address of requester |
| has_complained | Prevent duplicate submissions |
| created_at | Submission timestamp |

---

## 3. complaints

Core table of the application.

Each complaint belongs to either:

- a registered user
- or a guest user

and is assigned to a municipality department.

### Primary Key

- `comp_id`

### Foreign Keys

- `user_id`
- `guest_id`
- `department_id`

### Important Fields

| Column | Description |
|----------|-------------|
| title | Complaint title |
| description | Complaint details |
| latitude | GPS latitude |
| longitude | GPS longitude |
| photo_url | Uploaded image |
| status | Complaint status |
| created_at | Complaint creation time |

---

## 4. departments

Represents municipality departments.

Examples:

- Roads
- Water Supply
- Sanitation
- Electricity
- Waste Management

### Primary Key

- `department_id`

### Important Fields

| Column | Description |
|----------|-------------|
| name | Department name |
| description | Department description |

Each complaint belongs to exactly one department.

---

## 5. teams

Represents municipal field teams responsible for resolving complaints.

### Primary Key

- `id`

### Important Fields

| Column | Description |
|----------|-------------|
| team_name | Team name |
| available | Availability status |
| department_id | Parent department |

Each team belongs to one department.

---

## 6. complaint_allocations

Tracks assignment history of complaints.

Instead of storing only the current assignee, BharatFix stores every allocation event.

### Primary Key

- `id`

### Foreign Keys

- complaint_id
- assigned_by
- team_id

### Important Fields

| Column | Description |
|----------|-------------|
| assigned_at | Assignment timestamp |
| status | Allocation status |
| assigned_by | Administrator assigning complaint |
| team_id | Assigned team |

This design preserves the complete assignment history.

---

## 7. complaint_updates

Stores chronological updates made to complaints.

Examples

- Complaint received
- Team dispatched
- Work started
- Awaiting materials
- Resolved

### Primary Key

- `id`

### Foreign Keys

- complaint_id
- updated_by

### Important Fields

| Column | Description |
|----------|-------------|
| message | Update description |
| status | Status after update |
| updated_at | Timestamp |
| updated_by | User making update |

---

# Relationships

## User → Complaints

```
One User
      │
      ├───────────────► Many Complaints
```

---

## Guest User → Complaints

```
One Guest
      │
      ├──────────────► Many Complaints
```

---

## Department → Complaints

```
Department

1

│

├────────────► Many Complaints
```

---

## Department → Teams

```
Department

1

│

├────────────► Many Teams
```

---

## Complaint → Complaint Updates

```
Complaint

1

│

├────────────► Many Updates
```

---

## Complaint → Allocation History

```
Complaint

1

│

├────────────► Many Allocation Records
```

---

# Complaint Lifecycle

```
Citizen

↓

Complaint Created

↓

Department Selected

↓

Team Assigned

↓

Complaint Allocation Stored

↓

Team Updates Progress

↓

Complaint Updates Stored

↓

Complaint Resolved
```

---

# Status Flow

```
PENDING

↓

ASSIGNED

↓

IN_PROGRESS

↓

RESOLVED

↓

CLOSED
```

---

# Normalization

The schema follows approximately Third Normal Form (3NF).

Key normalization decisions include:

- Separate user and guest entities
- Separate department and team entities
- Allocation history stored independently
- Complaint updates stored independently
- No duplicated department information inside complaints
- No duplicated team information inside complaints

---

# Index Recommendations

Create indexes on frequently queried columns.

Recommended indexes:

```
complaints(status)

complaints(created_at)

complaints(department_id)

complaints(user_id)

complaints(guest_id)

complaint_updates(complaint_id)

complaint_allocations(complaint_id)

teams(department_id)
```

---

# Referential Integrity

Foreign key constraints ensure:

- Complaints cannot reference nonexistent departments.
- Allocations cannot reference nonexistent teams.
- Updates always belong to an existing complaint.
- Teams belong to valid departments.

---

# Security Considerations

- Passwords are stored as BCrypt hashes.
- No plaintext passwords.
- Sensitive information is never duplicated.
- Foreign keys enforce data integrity.

---

# Future Improvements

Potential enhancements include:

- Categories table for complaint classification.
- Ward or Zone table for geographic routing.
- File attachments table supporting multiple images per complaint.
- Notification table for email/SMS/push notifications.
- Audit log table for administrative actions.
- SLA tracking for complaint resolution deadlines.
- Complaint priority levels (Low, Medium, High, Critical).
- Soft delete support for recoverable records.

---

# Design Principles

The BharatFix database is designed with the following goals:

- Normalized relational design
- Strong referential integrity
- Scalable complaint tracking
- Complete allocation history
- Complete status history
- Minimal data duplication
- Efficient querying
- Easy extensibility