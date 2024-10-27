from rest_framework import serializers
from .models import Todo,Projects


class TodoSerializer(serializers.ModelSerializer):
    # project = serializers.PrimaryKeyRelatedField(queryset=Projects.objects.all(), required=True)
    class Meta:
        model = Todo
        fields = ["id", "task", "completed", "project"]



class ProjectsSerializer(serializers.ModelSerializer):
    todos = TodoSerializer(many=True, read_only=True)
    class Meta:
        model = Projects
        fields = ["id", "name", "todos"]