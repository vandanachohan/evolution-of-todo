# Phase II Todo Application Specification

## Overview
Build a full-stack Todo web application with persistent storage.
The application should allow users to manage todos via a browser interface.

---

## Backend Specification (FastAPI)

### Tech Stack
- FastAPI
- SQLModel
- PostgreSQL (Neon Serverless)

### Database Model
Create a Todo table with:
- id: Integer, primary key
- title: String
- completed: Boolean (default False)
- priority: String (High, Medium, Low)
- tags: List[String]

---

### API Endpoints

#### Create Todo
POST /todos
Request Body:
- title
- priority
- tags

Response:
- Created todo object

---

#### Get Todos
GET /todos
Query Parameters (optional):
- search
- status
- priority
- tag
- sort

---

#### Update Todo
PUT /todos/{id}
Request Body:
- title
- priority
- tags
- completed

---

#### Delete Todo
DELETE /todos/{id}

---

#### Mark Todo Complete
PATCH /todos/{id}/complete

---

## Frontend Specification (Next.js)

### Pages
- Home page:
  - Displays todo list
  - Search input
  - Filter and sort controls
- Add Todo page or modal
- Update Todo page or modal

### UI Behavior
- Todos must display:
  - Title
  - Priority
  - Tags
  - Completion status
- Completed todos should be visually distinct

---

## Functional Requirements
- Users can add, update, delete todos
- Users can mark todos as complete
- Users can search todos by title
- Users can filter todos by status, priority, or tags
- Users can sort todos alphabetically or by priority

---

## Configuration
- Use environment variables for database connection
- Provide a sample .env file

---

## Constraints
- Do not write any code manually
- Do not include AI features
- Do not include authentication
- Output must be production-ready and runnable locally
