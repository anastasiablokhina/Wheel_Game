from django.db import models


class Question(models.Model):
    CATEGORIES_CHOICES = (
        (None, 'Вопрос default'),
        ('blitz', 'Блиц'),
        ('superblitz', 'Суперблиц'),
        ('blackbox', 'Чёрный ящик'),
        ('handout', 'Вопрос с раздаткой'),
        ('warm-up', 'Нулевой вопрос'),
        ('extra', 'Запасной вопрос'),
        ('bonus', 'Бонусный вопрос'),
    )
    
    seen = models.BooleanField(default=False, verbose_name='Сыгран')
    category = models.CharField(
        null=True,
        blank=True,
        max_length=20,
        choices=CATEGORIES_CHOICES,
        verbose_name='Категория'
    )

    def __str__(self):
        if self.seen:
            return f'{self.id} СКРЫТ'
        else:
            return f'{self.id}'


class Content(models.Model):
    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE,
        related_name='content',
        verbose_name='Текст вопроса'
    )
    body = models.TextField(null=True, blank=True, verbose_name='Текст вопроса')

    def __str__(self):
        return f'Текст {self.question.id} вопроса'
