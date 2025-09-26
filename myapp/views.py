from django.http import JsonResponse
from django.shortcuts import render
import json
from django.contrib.auth import login, authenticate
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from .models import Recipe;


def home(request):
    return JsonResponse({'message': 'Hello, world!'})


@csrf_exempt
def login_user(request):
    # Get username and password from request.POST dictionary
    data = json.loads(request.body)
    username = data['username']
    password = data['password']
    # Try to check if provide credential can be authenticated
    user = authenticate(username=username, password=password)
    data = {"username": username}
    if user is not None:
        # If user is valid, call login method to login current user
        login(request, user)
        data = {"username": username, "status": "Authenticated"}
    return JsonResponse(data)


def get_recipes(request, category="all"):
    if (category == "all"):
        recipes = Recipe.objects.all().values("id", "name", "category", "ingredients", "description")
    else:
        recipes = Recipe.objects.filter(category=category).values("id", "name", "category", "ingredients", "description")
    return JsonResponse({'recipes': list(recipes)}, safe=False)


def get_recipe(request, id):
    recipe = Recipe.objects.filter(id=id).values("id", "name", "category", "ingredients", "description").first()
    return JsonResponse(recipe, safe=False)


@csrf_exempt
def create_recipe(request):
    if request.method == "POST":
        data = json.loads(request.body)
        name = data.get("name")
        category = data.get("category")
        ingredients = data.get("ingredients")
        description = data.get("description")
        recipe = Recipe.objects.create(name=name, category=category, ingredients=ingredients, description=description)
        return JsonResponse({"message": "Recipe created successfully", "id": recipe.id}, status=201)
    return JsonResponse({"error": "Invalid request method"}, status=400)