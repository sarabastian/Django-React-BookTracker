from rest_framework import serializers
from .models import Book, Author


class AuthorSerializer(serializers.ModelSerializer):
    # books = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Author
        fields = ('first_name', 'last_name')


class BookSerializer(serializers.ModelSerializer):
    # author = serializers.ReadOnlyField(source='author.first_name')
    author = AuthorSerializer(many=False, read_only=True)

    class Meta:
        model = Book
        fields = ['title', 'description', 'read', 'author']
