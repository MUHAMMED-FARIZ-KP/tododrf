Sure! Here’s a formatted README file based on the content you provided:

```markdown
# Todo Application

This is a Todo application developed using Python Django for the backend and React with Vite for the frontend. It allows users to manage their tasks efficiently by creating, updating, and deleting todos, all while providing user authentication.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [License](#license)

## Features
- User registration and login functionality.
- Create, update, delete, and complete tasks.
- Project-based todo organization.
- Separate views for pending and completed tasks.
- Export task summaries as Markdown files.
- Responsive design for mobile and desktop.

## Technologies Used
- **Backend**: Python, Django, Django REST Framework
- **Frontend**: React, Vite
- **Database**: SQLite (or any other database of your choice)
- **Authentication**: JSON Web Tokens (JWT) with `djangorestframework-simplejwt`

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (for React)
- [Python](https://www.python.org/downloads/) (for Django)
- [pip](https://pip.pypa.io/en/stable/) (for Python package management)

### Backend Setup
1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd <your-backend-directory>
   ```

2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run database migrations:
   ```bash
   python manage.py migrate
   ```

5. Create a superuser (optional):
   ```bash
   python manage.py createsuperuser
   ```

6. Start the Django server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd <your-frontend-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React application:
   ```bash
   npm run dev
   ```

## Usage

1. Navigate to `http://localhost:3000` in your web browser to access the application.
2. Register a new account or log in with an existing account.
3. Create projects and manage your todos by adding, updating, deleting, and marking them as completed.
4. Use the export functionality to generate a summary of completed tasks.

## API Endpoints

- **User Registration**: `POST /register/`
  - Body: `{ "username": "string", "password": "string" }`
  
- **User Login**: `POST /login/`
  - Body: `{ "username": "string", "password": "string" }`
  
- **Todo List**: `GET /todos/`
  - Retrieves all todos (requires authentication).
  
- **Create Todo**: `POST /todos/`
  - Body: `{ "task": "string", "project": "integer" }`
  
- **Update Todo**: `PUT /todos/{id}/`
  - Body: `{ "task": "string", "completed": "boolean" }`
  
- **Delete Todo**: `DELETE /todos/{id}/`

## Folder Structure
```
/todo-application
├── /backend
│   ├── /your_django_project
│   ├── manage.py
│   └── requirements.txt
└── /frontend
    ├── /src
    ├── package.json
    └── vite.config.js
```

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```
