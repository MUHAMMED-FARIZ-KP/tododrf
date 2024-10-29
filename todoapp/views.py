from django.shortcuts import render,get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework import status
from .models import Todo,Projects
from .serializers import TodoSerializer,ProjectsSerializer
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import make_password

# Create your views here.




@api_view(['POST'])
def register_user(request):
    data = request.data
    try:
        user = User.objects.create(
            username=data['username'],
            password=make_password(data['password'])
        )
        return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def login_user(request):
    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(username=username, password=password)
    if user:
        refresh = RefreshToken.for_user(user)
        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        })
    return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(["GET","POST"])
@permission_classes([IsAuthenticated])
def todo_list(request):
    if request.method == "GET":
        todos= Todo.objects.all()
        serializer=TodoSerializer(todos,many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer=TodoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        
        return  Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    

@api_view(["GET","PUT","DELETE","PATCH"])
@permission_classes([IsAuthenticated])
def todo_detail(request,pk):
    todo=get_object_or_404(Todo,id=pk)

    if request.method=='GET':
        serializer=TodoSerializer(todo)
        return Response(serializer.data)

    elif request.method=='PUT':
        serializer=TodoSerializer(todo,data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return  Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    elif request.method=="DELETE":
        todo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(["GET","POST"])
@permission_classes([IsAuthenticated])
def project_list(request):
    if request.method == "GET":
        projects= Projects.objects.all()
        serializer=ProjectsSerializer(projects,many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer=ProjectsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        
        return  Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def project_todos(request, pk):
    project = get_object_or_404(Projects, pk=pk)
    todos = project.todos.all() 
    serializer = TodoSerializer(todos, many=True)
    return Response(serializer.data)

@api_view(["GET", "PUT", "DELETE", "PATCH"])
@permission_classes([IsAuthenticated])
def project_detail(request, pk):
    project = get_object_or_404(Projects, pk=pk)

    if request.method == 'GET':
        serializer = ProjectsSerializer(project)
        return Response(serializer.data)
    elif request.method == 'PUT' or request.method == 'PATCH':
        serializer = ProjectsSerializer(project, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        project.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)