from django.contrib import admin
from .models import Book, Author


# models_list = [Book, Author]


class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'read', 'author')


class AuthorAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name')


admin.site.register(Book, BookAdmin)

admin.site.register(Author, AuthorAdmin)
