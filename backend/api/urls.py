from django.urls import path
from .views_for_api import IncrementView, ExtractConceptsView

urlpatterns = [
    path('increment/', IncrementView.as_view(), name='increment'),
    path('chat/', ExtractConceptsView.as_view(), name='chat'),
]
