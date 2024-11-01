
# Todo Application

https://github.com/user-attachments/assets/ed6b2fc6-b039-4092-9fc1-2e5f4ca985f6
## Overview
This project is a Todo application built using Python Django for the backend and React with Vite for the frontend. It allows users to manage their tasks efficiently with user authentication.

## Features

- **User Authentication**: Users can register and log in to access their tasks securely.
- **Task Management**: Users can create, update, and delete tasks.
- **Task Filtering**: Tasks are filtered into 'Completed' and 'Pending' categories based on their status.
- **Project Association**: Todos are displayed only for the selected project, enhancing organization.

## Technologies Used

- **Frontend**: React, Vite
- **Backend**: Python, Django
- **Database**: SQLite
- **Authentication**: Django Rest Framework

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MUHAMMED-FARIZ-KP/tododrf
2. Create a virtual environment and activate it:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
3. Change the directory to project
    ```bash
    cd tododrf
4. Install dependencies: 
    ```bash
    pip install -r requirements.txt
5. Navigate to the frontend directory and install dependencies:
    ```bash
    cd todo_app_react
    npm install
6. Set up the database and run migrations:
    ```bash
    cd tododrf
    python manage.py migrate
7. Run the backend server:
    ```bash
    python manage.py runserver
8. Run the frontend server:
    ```bash
    cd todo_app_react
    npm run dev

## Usage
- Visit http://localhost:8000 for the backend API.
- Visit http://localhost:5173/ for the frontend application.
- Register a new user
- Login and explore My todo Application

<!-- ## API Endpoints
- User Registration: POST /register/
- User Login: POST /login/
- Todo List: GET /todos/
- Todo Detail:GET /todos/<int:pk>/
- Project List:GET /projects/
- Project Detail:GET /projects/<int:pk>/
- Project Todos:GET /projects/<int:pk>/todos/ -->

## Contributing
Feel free to submit issues and pull requests. Your contributions are welcome!

## Contact
- farizz7676off@gmail.com
- +91 8113081411
