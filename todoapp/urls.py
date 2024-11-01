from django.urls import path
from . import views

urlpatterns = [
    path("register/", views.register_user, name="register_user"),
    path("login/", views.login_user, name="login_user"),
    path("todos/", views.todo_list, name="todo_list"),
    path("todos/<int:pk>/", views.todo_detail, name="todo_detail"),
    path("projects/",views.project_list,name="project_list"),
    path("projects/<int:pk>/", views.project_detail, name="project_detail"),  # Add this route
    path("projects/<int:pk>/todos/", views.project_todos, name="project_todos")
]

# urls:
    # http://127.0.0.1:8000/todos
    # http://127.0.0.1:8000/todos/id
    # http://127.0.0.1:8000/projects
    # http://127.0.0.1:8000/projects/id/todos/