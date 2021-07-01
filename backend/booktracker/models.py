from django.db import models


class Author(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)

  # renames the instances of the model with their first name
    def _str_(self):
        return self.first_name


class Book(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    read = models.BooleanField(default=False)
    author = models.ForeignKey(
        Author, on_delete=models.CASCADE, db_constraint=False)

 # renames the instances of the model with their title name
    def _str_(self):
        return self.title
