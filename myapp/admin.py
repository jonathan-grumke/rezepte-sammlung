from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Recipe, User

class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('role',)}),
    )
    
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('role',)}),
    )
    
    list_display = UserAdmin.list_display + ('role',)

admin.site.register(User, CustomUserAdmin)
admin.site.register(Recipe)