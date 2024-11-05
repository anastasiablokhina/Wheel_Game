from django.contrib import admin
from .models import Question, Content

class ContentInline(admin.TabularInline):
    model = Content
    extra = 1

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    inlines = [ContentInline]

