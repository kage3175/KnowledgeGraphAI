from django.urls import path
from .views import IncrementView, ExtractConceptsView

urlpatterns = [
    path('increment/', IncrementView.as_view(), name='increment'),
    path('extract-concepts/', ExtractConceptsView.as_view(), name='extract-concepts'),
]
