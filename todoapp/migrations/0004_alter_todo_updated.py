# Generated by Django 5.1.2 on 2024-10-27 03:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todoapp', '0003_remove_todo_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='updated',
            field=models.DateField(auto_now=True),
        ),
    ]
