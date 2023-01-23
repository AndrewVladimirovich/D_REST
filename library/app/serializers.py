from rest_framework.serializers import HyperlinkedModelSerializer
from .models import Author, Biography, Article, Book

class AuthorModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'


class BiographyModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Biography
        fields = '__all__'


class ArticleModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'


class BookModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

        