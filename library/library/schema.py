import graphene
from graphene_django import DjangoObjectType
from authors.models import Book, Author

class Query(graphene.ObjectType):
    hello = graphene.String(default_value='Hi')

schema = graphene.Schema(query=Query)