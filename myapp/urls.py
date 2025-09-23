from django.urls import path
from . import views

urlpatterns = [
    path(route='login', view=views.login_user, name='login'),
    
    path(route='recipes/', view=views.get_recipes, name='get_recipes'),
    path(route='recipes/<str:category>', view=views.get_recipes, name='get_recipes_by_category'),
    
    path(route='recipe/<int:id>', view=views.get_recipe, name='get_recipe'),
    
    # path(route='', view=views.home, name='home'),
]