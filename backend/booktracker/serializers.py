from rest_framework import serializers
from .models import Book, Author
# from drf_writable_nested import WritableNestedModelSerializer


class AuthorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Author
        fields = ['first_name', 'last_name']


class BookSerializer(serializers.ModelSerializer):

    author = AuthorSerializer(many=False)

    class Meta:
        model = Book
        fields = ['id', 'title', 'description', 'read', 'author']

    # author = serializers.SerializerMethodField()
    # def get_result(self, obj):
    #     return obj.author

    def create(self, validated_data):
        author_ordereddict = (validated_data['author'])
        author_dict = dict(author_ordereddict)
        print(author_dict)
        # author_data = validated_data.pop(author_dict)
        validated_data['author'] = author_dict
        print(validated_data)
        Author.objects.create(**author_dict)
        book = Book.objects.create(**validated_data)

        return book
