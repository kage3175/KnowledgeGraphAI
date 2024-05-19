from django.urls import path
from .views import IncrementView

urlpatterns = [
    path('increment/', IncrementView.as_view(), name='increment'),
]
