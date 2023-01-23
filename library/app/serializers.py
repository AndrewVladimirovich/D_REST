from rest_framework.serializers import ModelSerializer
from .models import Author, Biography, Article, Book

class AuthorModelSerializer(ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'

class BiographyModelSerializer(ModelSerializer):
    class Meta:
        model = Biography
        fields = '__all__'


class ArticleModelSerializer(ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'


class BookModelSerializer(ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

        