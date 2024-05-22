from rest_framework import serializers
from .models import Concept, SuperConcept, Article

class ConceptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Concept
        fields = '__all__'

class SuperConceptSerializer(serializers.ModelSerializer):
    class Meta:
        model = SuperConcept
        fields = '__all__'

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'
