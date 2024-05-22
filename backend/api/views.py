from rest_framework import viewsets
from .models import Concept, SuperConcept, Article
from .serializers import ConceptSerializer, SuperConceptSerializer, ArticleSerializer

class ConceptViewSet(viewsets.ModelViewSet):
    queryset = Concept.objects.all()
    serializer_class = ConceptSerializer

class SuperConceptViewSet(viewsets.ModelViewSet):
    queryset = SuperConcept.objects.all()
    serializer_class = SuperConceptSerializer

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
