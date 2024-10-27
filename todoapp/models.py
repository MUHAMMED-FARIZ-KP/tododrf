from django.db import models

# Create your models here.
class Projects(models.Model):
    name=models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Todo(models.Model):
    project = models.ForeignKey(Projects, on_delete=models.CASCADE, related_name="todos")
    task = models.CharField(max_length=100)
    completed = models.BooleanField(default=False)
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)


    def __str__(self):
        return self.task

