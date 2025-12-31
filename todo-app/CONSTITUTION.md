# Todo Application Constitution (Phase II)

## Purpose
This application is a full-stack web-based Todo application.
It evolves Phase I into a persistent, production-style system using Spec-Driven Development.

## Core Principles
- All code MUST be generated via Claude Code
- Manual code writing is strictly prohibited
- Specifications are the single source of truth

## Architecture Rules
- Frontend MUST be built using Next.js
- Backend MUST be built using FastAPI
- Database MUST use SQLModel with PostgreSQL (Neon Serverless)
- Frontend and backend MUST be separated

## Data Persistence Rules
- Todos MUST be stored in a database
- Data MUST persist across application restarts
- No in-memory-only storage is allowed

## Todo Model Rules
Each Todo MUST have:
- id (integer, primary key, auto-increment)
- title (string)
- completed (boolean)
- priority (string: High, Medium, Low)
- tags (list of strings)

## Required Features
- Add Todo
- View all Todos
- Update Todo
- Delete Todo
- Mark Todo as Complete
- Search Todos
- Filter Todos (by status, priority, tags)
- Sort Todos (alphabetical, priority)

## API Rules
- Backend MUST expose RESTful APIs
- APIs MUST return JSON
- Proper HTTP status codes MUST be used

## UI Rules
- UI MUST be simple, clean, and usable
- Forms MUST be used for adding and updating todos
- Todo list MUST be visible on the main page

## Prohibitions
- No AI chatbot in Phase II
- No authentication
- No Kubernetes or Docker
