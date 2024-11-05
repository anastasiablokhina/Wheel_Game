from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('questions/seen', views.getUnavailableQuestions, name='available_questions'),
    path('questions/', views.getAvailableQuestions, name='available_questions'),
    path('questions/<str:pk>/', views.getQuestion, name='question'),
]