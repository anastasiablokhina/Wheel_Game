from rest_framework.serializers import ModelSerializer
from .models import Question, Content


class ContentSerializer(ModelSerializer):
    class Meta:
        model = Content
        fields = ['body']


class QuestionSerializer(ModelSerializer):
    content = ContentSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = '__all__'