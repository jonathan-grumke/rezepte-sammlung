from django.db import models
from django.contrib.auth.models import AbstractUser


class Recipe(models.Model):
    title = models.CharField(max_length=200)
    
    CATEGORY_CHOICES = [
        ('main', 'Hauptgericht'),
        ('salad', 'Salat'),
        ('dessert', 'Dessert'),
        ('snack', 'Snack'),
        ('drink', 'Getränk'),
        ('soup', 'Suppe'),
    ]
    
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='main')
    ingredients = models.JSONField()
    instructions = models.TextField()
    servings = models.IntegerField(default=2)
    time = models.IntegerField(help_text="Zubereitungszeit in Minuten", default=30)
    image = models.ImageField(
        upload_to='recipes/',
        null=True,
        blank=True,
        default='recipes/default.jpg'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    published = models.BooleanField(default=False)
    
    def __str__(self):
        return self.title
    

class User(AbstractUser):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('editor', 'Editor'),
        ('user', 'User'),
    ]
    
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='user')
    
    def is_admin(self):
        return self.role == 'admin'
    
    def is_editor(self):
        return self.role == 'editor'