# Todo Application

This is a Todo application developed using Python Django for the backend and React with Vite for the frontend. It allows users to manage their tasks efficiently by creating, updating, and deleting todos, all while providing user authentication.
# Table of Contents
- [Installation](#Installation)

## Setup Instructions

### Prerequisites
- Python 3.x
- Django
- Django Rest Framework (DRF)
- Django Rest Framework SimpleJWT for token-based authentication

### Installation

1. **Clone the Repository**

    ```bash
    git clone <repository_url>
    cd <repository_name>
    ```

2. **Install Dependencies**

    Make sure you have a `requirements.txt` file with the following content:

    ```plaintext
    Django==4.2
    djangorestframework==3.14.0
    djangorestframework-simplejwt==5.2.2
    ```

    Then install the dependencies:

    ```bash
    pip install -r requirements.txt
    ```

3. **Run Migrations**

    ```bash
    python manage.py migrate
    ```

4. **Create a Superuser (optional)**

    ```bash
    python manage.py createsuperuser
    ```

5. **Run the Server**

    ```bash
    python manage.py runserver
    ```

6. **API Testing**

    You can test the API endpoints using tools like [Postman](https://www.postman.com/) or [curl](https://curl.se/).

## API Endpoints

### User Authentication

#### Register User
- **URL:** `/register/`
- **Method:** `POST`
- **Description:** Registers a new user.

#### Login User
- **URL:** `/login/`
- **Method:** `POST`
- **Description:** Logs in a user and returns an authentication token if successful.

### Todo Endpoints

#### Get All Todos
- **URL:** `/todos/`
- **Method:** `GET`
- **Description:** Retrieves a list of all todos.

#### Get Specific Todo by ID
- **URL:** `/todos/<int:pk>/`
- **Method:** `GET`, `PUT`, `DELETE`
- **Description:** Retrieves, updates, or deletes a specific todo by its ID.

### Project Endpoints

#### Get All Projects
- **URL:** `/projects/`
- **Method:** `GET`
- **Description:** Retrieves a list of all projects.

#### Get Specific Project by ID
- **URL:** `/projects/<int:pk>/`
- **Method:** `GET`, `PUT`, `DELETE`
- **Description:** Retrieves, updates, or deletes a specific project by its ID.

#### Get Todos for a Specific Project
- **URL:** `/projects/<int:pk>/todos/`
- **Method:** `GET`
- **Description:** Retrieves all todos associated with a specific project by the project ID.

## Example URLs

Use the following URLs to access the API:

- `http://127.0.0.1:8000/todos/` - Get all todos
- `http://127.0.0.1:8000/todos/<id>/` - Get, update, or delete a specific todo
- `http://127.0.0.1:8000/projects/` - Get all projects
- `http://127.0.0.1:8000/projects/<id>/todos/` - Get todos for a specific project

## Additional Information

- **Authentication:** The API uses token-based authentication. Use your authentication token in the `Authorization` header as `Bearer <token>`.
- **Response Format:** All responses are in JSON format.
- **Error Handling:** Standard HTTP status codes are used for success and error handling.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

---

Happy coding!
