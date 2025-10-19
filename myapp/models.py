from django.db import models


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
    image = models.ImageField(
        upload_to='recipes/',
        null=True,
        blank=True,
        default='recipes/default.jpg'
        )
    
    def __str__(self):
        return self.title