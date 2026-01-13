
# evolution-of-todo
 Phase II – Full-Stack Todo Web Application

  Phase Overview

  Phase II of the "Evolution of Todo" project transforms the console-based Todo application from Phase I into a  
  full-stack web application. This phase introduces persistent data storage, a modern web interface, and enhanced
  functionality while maintaining the core Todo management capabilities.

  Tech Stack

   - Frontend: Next.js
   - Backend: FastAPI
   - Database: PostgreSQL (Neon Serverless)
   - ORM: SQLModel
   - Frontend Dependencies: React, Axios
   - Backend Dependencies: Pydantic, Uvicorn

  Features

   - Add Todo: Create new todos with title, priority, and tags
   - View Todos: Display all todos with visual indicators for completion status
   - Update Todo: Modify existing todo details
   - Delete Todo: Remove todos from the list
   - Mark Todo as Complete: Toggle completion status with visual feedback
   - Search Todos: Find todos by title
   - Filter Todos: Filter by status (completed/pending), priority (High/Medium/Low), and tags
   - Sort Todos: Sort by title, priority, or ID in ascending/descending order

   - backend/: Contains the FastAPI application with API routes, database models, and configuration
   - frontend/: Contains the Next.js application with pages, components, and styling

  Screenshots

  Placeholder for application screenshots

  ![backend-todo-app](image.png)

  How to Run Locally
  ![todo-app](todp-app.PNG)

   4. Access the application at http://localhost:3000
   ![add=from](todp-app-1.PNG)


  API Overview

  The backend provides a RESTful API with the following endpoints:

   - GET /api/v1/todos - Retrieve all todos with optional filtering and sorting
   - POST /api/v1/todos - Create a new todo
   - GET /api/v1/todos/{id} - Retrieve a specific todo
   - PUT /api/v1/todos/{id} - Update a specific todo
   - DELETE /api/v1/todos/{id} - Delete a specific todo
   - PATCH /api/v1/todos/{id}/complete - Toggle completion status of a todo
   - GET /health - Health check endpoint

  Notes & Limitations

   - No Authentication: This phase does not include user authentication or authorization
   - No AI Features: AI capabilities will be added in Phase III
   - Local Development: Uses SQLite for local development; PostgreSQL for productio

# Phase II: Full-Stack Todo Web Application

## Overview
Phase II of the "Evolution of Todo" project transforms the console-based Todo application from Phase I into a full-stack web application. This phase introduces persistent data storage, a modern web interface, and enhanced functionality while maintaining the core Todo management capabilities.

## Tech Stack
- Frontend: Next.js
- Backend: FastAPI
- Database: PostgreSQL (Neon Serverless)
- ORM: SQLModel
- Frontend Dependencies: React, Axios
- Backend Dependencies: Pydantic, Uvicorn

## Features
- Add Todo: Create new todos with title, priority, and tags
- View Todos: Display all todos with visual indicators for completion status
- Update Todo: Modify existing todo details
- Delete Todo: Remove todos from the list
- Mark Todo as Complete: Toggle completion status with visual feedback
- Search Todos: Find todos by title
- Filter Todos: Filter by status (completed/pending), priority (High/Medium/Low), and tags
- Sort Todos: Sort by title, priority, or ID in ascending/descending order

- backend/: Contains the FastAPI application with API routes, database models, and configuration
- frontend/: Contains the Next.js application with pages, components, and styling

## How to Run Online Versel Link
https://evolution-of-todo-ten.vercel.app/

4. Access the application at http://localhost:3000

## API Overview
The backend provides a RESTful API with the following endpoints:
- GET /api/v1/todos - Retrieve all todos with optional filtering and sorting
- POST /api/v1/todos - Create a new todo
- GET /api/v1/todos/{id} - Retrieve a specific todo
- PUT /api/v1/todos/{id} - Update a specific todo
- DELETE /api/v1/todos/{id} - Delete a specific todo
- PATCH /api/v1/todos/{id}/complete - Toggle completion status of a todo
- GET /health - Health check endpoint

## Notes & Limitations
- No Authentication: This phase does not include user authentication or authorization
- No AI Features: AI capabilities will be added in Phase III
- Local Development: Uses SQLite for local development; PostgreSQL for production
(Phase II: add frontend components, backend schemas, and clean gitignore)
