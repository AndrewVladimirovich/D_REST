from rest_framework.viewsets import ModelViewSet, ViewSet
from .models import Author, Article, Biography, Book
from .serializers import AuthorModelSerializer, ArticleModelSerializer, BiographyModelSerializer, BookModelSerializer
from rest_framework.views import APIView
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView, DestroyAPIView, UpdateAPIView
from rest_framework import viewsets


class AuthorModelViewSet(ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorModelSerializer


class ArticleModelViewSet(ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleModelSerializer


class BiographyModelViewSet(ModelViewSet):
    queryset = Biography.objects.all()
    serializer_class = BiographyModelSerializer


class BookModelViewSet(ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookModelSerializer


class MyAPIView(ViewSet):
   
    def list(self, request):
       authors = Author.objects.all()
       serializer = AuthorModelSerializer(authors, many=True)
       return Response(serializer.data)
    
    def destroy(self, request):
        authors = Author.objects.all()
        serializer = AuthorModelSerializer(authors, many=True)
        return Response(serializer.data)


