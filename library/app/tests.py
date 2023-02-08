from django.test import TestCase
import json
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from django.contrib.auth.models import User
from .views import AuthorModelViewSet, BookModelViewSet
from .models import Author, Book

class TestAuthorViewSet(TestCase):

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/authors')
        view = AuthorModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_get_guest(self):
        factory = APIRequestFactory()
        request = factory.post('/api/authors', {
            'first_name': 'Petr', 
            'last_name': 'Vasilev', 
            'bithday_year': 1980
            })
        view = AuthorModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    
    def test_create_admin(self):
        factory = APIRequestFactory()
        request = factory.post('/api/authors', {
            'first_name': 'Petr', 
            'last_name': 'Vasilev', 
            'bithday_year': 1980
            })
        admin = User.objects.create_superuser('admin', None, None)
        force_authenticate(request, admin)
        view = AuthorModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_detail(self):
        author = Author.objects.create(first_name='Andrey', last_name='Tretyakov', bithday_year=1979)
        client = APIClient()
        response = client.get(f'/api/authors/{author.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_guest(self):
        author = Author.objects.create(first_name='Andrey', last_name='Tretyakov', bithday_year=1979)
        client = APIClient()
        response = client.put(f'/api/authors/{author.id}/', {'first_name': 'Lev', 'last_name': 'Tolstoy', 'bithday_year': 1900})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_edit_admin(self):
        author = Author.objects.create(first_name='Andrey', last_name='Tretyakov', bithday_year=1979)
        client = APIClient()
        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin')
        client.login(username='admin', password='admin')
        response = client.put(f'/api/authors/{author.id}/', {'first_name': 'Lev', 'last_name': 'Tolstoy', 'bithday_year': 1900})
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestMath(APISimpleTestCase):
    def test_sqrt(self):
        import math
        self.assertEqual(math.sqrt(4), 2)

    
class TestBookViewSet(APITestCase):

    def test_get_lists(self):
        response = self.client.get('/api/books/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_book_admin(self):
        author = Author.objects.create(first_name='Andrey', last_name='Tretyakov', bithday_year=1979)
        book = Book.objects.create(name='Книга')
        book.author.add(author)
        book.save()

        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin')
        self.client.login(username='admin', password='admin')
        response = self.client.put(f'/api/books/{book.id}/', {'name': 'Война и мир', 'author': author.id})

        print(response.json())
        book = Book.objects.get(pk=book.id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(book.name, 'Война и мир')
        self.client.logout()

        