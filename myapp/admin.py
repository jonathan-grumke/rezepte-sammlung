from django.contrib import admin
from .models import Recipe, User

admin.site.register(User)
admin.site.register(Recipe)