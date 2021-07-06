from rest_framework import serializers
from .models import Book, Author
# from drf_writable_nested import WritableNestedModelSerializer


class AuthorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Author
        fields = ('first_name', 'last_name')


class BookSerializer(serializers.ModelSerializer):

    author = AuthorSerializer(many=False)

    class Meta:
        model = Book
        fields = ['id', 'title', 'description', 'read', 'author']

    def create(self, validated_data):
        author_data = validated_data.pop('author')
        book = Book.objects.create(**validated_data)
        Author.objects.create(**author_data)

        return book
