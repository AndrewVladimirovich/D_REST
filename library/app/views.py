from rest_framework.viewsets import ModelViewSet
from .models import Author, Article, Biography, Book
from .serializers import AuthorModelSerializer, ArticleModelSerializer, BiographyModelSerializer, BookModelSerializer
from rest_framework.views import APIView
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView, DestroyAPIView, UpdateAPIView

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


class MyAPIView(CreateAPIView, ListAPIView, RetrieveAPIView, DestroyAPIView, UpdateAPIView):

    queryset = Author.objects.all()
    serializer_class = AuthorModelSerializer
    
#    def get(self, request):
#        return Response('GET Success')
#
#   def post(self, request):
#        return Response('POST Success')