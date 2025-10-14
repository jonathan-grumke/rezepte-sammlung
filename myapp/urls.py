from django.urls import path
from . import views

urlpatterns = [
    path(route='login', view=views.login_user, name='login'),
    
    path(route='recipes/', view=views.get_recipes, name='get_recipes'),
    path(route='recipes/<str:category>', view=views.get_recipes, name='get_recipes_by_category'),
    
    path(route='recipe/<int:id>', view=views.get_recipe, name='get_recipe'),
    
    path(route='recipe/create', view=views.create_recipe, name='create_recipe'),
    path(route='recipe/<int:id>/delete', view=views.delete_recipe, name='delete_recipe'),
    path(route='recipe/<int:id>/update', view=views.update_recipe, name='update_recipe'),
    
    # path(route='', view=views.home, name='home'),
]