from django.db import models


class Author(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)


class Book(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    read = models.BooleanField(default=False)
    author = models.ForeignKey(
        Author, on_delete=models.CASCADE)
