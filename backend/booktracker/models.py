from django.db import models

# Create your models here.


# class AuthorManager(models.Model):
# def get_by_natural_key(self, first_name, last_name):
#     return self.get(first_name=first_name, last_name=last_name)


class Author(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)

    def _str_(self):
        return self.first_name

    # objects = AuthorManager()

    # class Meta:
    #     unique_together = [['first_name', 'last_name']]


class Book(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    read = models.BooleanField(default=False)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)

    def _str_(self):
        return self.title
