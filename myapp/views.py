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
        recipes = Recipe.objects.all().values("id", "title", "category", "ingredients", "instructions")
    else:
        recipes = Recipe.objects.filter(category=category).values("id", "title", "category", "ingredients", "instructions")
    return JsonResponse({'recipes': list(recipes)}, safe=False)


def get_recipe(request, id):
    recipe = Recipe.objects.filter(id=id).values("id", "title", "category", "ingredients", "instructions").first()
    return JsonResponse(recipe, safe=False)


@csrf_exempt
def create_recipe(request):
    if request.method == "POST":
        data = json.loads(request.body)
        title = data.get("title")
        category = data.get("category")
        ingredients = data.get("ingredients")
        instructions = data.get("instructions")
        recipe = Recipe.objects.create(title=title, category=category, ingredients=ingredients, instructions=instructions)
        return JsonResponse({"message": "Recipe created successfully", "id": recipe.id}, status=201)
    return JsonResponse({"error": "Invalid request method"}, status=400)


@csrf_exempt
def delete_recipe(request, id):
    if request.method == "DELETE":
        try:
            recipe = Recipe.objects.get(id=id)
            recipe.delete()
            return JsonResponse({"message": "Recipe deleted successfully"}, status=200)
        except Recipe.DoesNotExist:
            return JsonResponse({"error": "Recipe not found"}, status=404)
    return JsonResponse({"error": "Invalid request method"}, status=400)


@csrf_exempt
def update_recipe(request, id):
    if request.method == "PUT":
        try:
            data = json.loads(request.body)
            recipe = Recipe.objects.get(id=id)
            recipe.title = data.get("title", recipe.title)
            recipe.category = data.get("category", recipe.category)
            recipe.ingredients = data.get("ingredients", recipe.ingredients)
            recipe.instructions = data.get("instructions", recipe.instructions)
            recipe.save()
            return JsonResponse({"message": "Recipe updated successfully"}, status=200)
        except Recipe.DoesNotExist:
            return JsonResponse({"error": "Recipe not found"}, status=404)
    return JsonResponse({"error": "Invalid request method"}, status=400)