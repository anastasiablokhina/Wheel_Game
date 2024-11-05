from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import QuestionSerializer, ContentSerializer
from .models import Question, Content


@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/questions/',
            'method': 'GET',
            'body': None,
            'description': 'Returns IDs of available questions'  
        },
        {
            'Endpoint': '/questions/seen',
            'method': 'GET',
            'body': None,
            'description': 'Returns IDs of unavailable questions'  
        },
        {
            'Endpoint': '/questions/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single question object'
        },
        {
            'Endpoint': '/questions/id',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing question with data sent in post request'
        },
    ]
    return Response(routes)

@api_view(['GET', 'PUT'])
def getQuestion(request, pk):
    if request.method == 'GET':
        question = Question.objects.prefetch_related('content').get(id=pk)
        serializer = QuestionSerializer(question, many=False)
        return Response(serializer.data) 
    if request.method == 'PUT':
        data = request.data
        question = Question.objects.get(id=pk)
        serializer = QuestionSerializer(instance=question, data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK) 

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  

@api_view(['GET'])
def getAvailableQuestions(request):
    questions = Question.objects.filter(seen=False).exclude(category__in=['warm-up', 'bonus', 'extra']).values_list('id', flat=True)
    return Response(list(questions))

@api_view(['GET'])
def getUnavailableQuestions(request):
    questions = Question.objects.filter(seen=True).exclude(category__in=['warm-up', 'bonus', 'extra']).values_list('id', flat=True)
    return Response(list(questions))
    
