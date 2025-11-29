from django.http import JsonResponse
from django.shortcuts import render
import json
import copy
from django.contrib.auth import login, logout, authenticate
from django.middleware.csrf import get_token
from .models import Recipe, User;


def get_csrf(request):
    return JsonResponse({"csrfToken": get_token(request)})


def login_user(request):
    # Get username and password from request.POST dictionary
    data = json.loads(request.body)
    username = data['username']
    password = data['password']
    # Try to check if provide credential can be authenticated
    user = authenticate(request, username=username, password=password)
    data = {"username": username}
    if user is not None:
        # If user is valid, call login method to login current user
        login(request, user)
        data = {
            "status": "authenticated",
            "username": username,
        }
    return JsonResponse(data)


def logout_user(request):
    logout(request)
    return JsonResponse({
        "message": "Logged out successfully",
        "success": True
    })


def current_user(request):
    user = request.user
    if user.is_authenticated:
        data = {
            "authenticated": True,
            "username": user.username,
            "firstname": user.first_name,
            "role": user.role,
        }
    else:
        data = {
            "authenticated": False,
            "role": "guest"
        }
    return JsonResponse(data)


def register_user(request):
    data = json.loads(request.body)
    username = data['username']
    password = data['password']
    firstname = data.get('firstname', '')
    lastname = data.get('lastname', '')
    email = data.get('email', '')
    
    username_exists = User.objects.filter(username=username).exists()
    
    if not username_exists:
        user = User.objects.create_user(username=username, password=password, first_name=firstname, last_name=lastname, email=email, role='user')
        login(request, user)
        
        return JsonResponse({
            "message": "User registered successfully",
            "status": "success",
            "username": username,
        })
    else:
        return JsonResponse({
            "message": "Username already exists",
            "status": "error",
        })
        

def get_recipes(request, category="all"):
    if (category == "all"):
        recipes = Recipe.objects.values("id", "title", "category", "ingredients", "instructions", "servings", "image", "time", "published")
    else:
        recipes = Recipe.objects.filter(category=category).values("id", "title", "category", "ingredients", "instructions", "servings", "image", "time", "published")
    return JsonResponse({'recipes': list(recipes)}, safe=False)


def get_recipe(request, id):
    if request.method == "GET":
        try:
            recipe = Recipe.objects.filter(id=id).values("id", "title", "category", "ingredients", "instructions", "servings", "image", "time", "published").first()
            return JsonResponse(recipe, safe=False)
        except Recipe.DoesNotExist:
            return JsonResponse({"error": "Recipe not found"}, status=404)


def create_recipe(request):
    if request.method == "POST":
        # data = json.loads(request.body)
        title = request.POST.get("title")
        category = request.POST.get("category")
        ingredients = json.loads(request.POST.get("ingredients", "{}"))
        instructions = request.POST.get("instructions")
        servings = request.POST.get("servings", 2)
        time = request.POST.get("time", 30)
        published = request.POST.get("published", "false").lower()=="true"
        image = request.FILES.get("image")
        if(image is None):
            image = 'recipes/default.jpg'
        recipe = Recipe.objects.create(title=title, category=category, ingredients=ingredients, instructions=instructions, servings=servings, image=image, time=time, published=published)
        return JsonResponse({"message": "Recipe created successfully", "id": recipe.id}, status=201)
    return JsonResponse({"error": "Invalid request method"}, status=400)


def delete_recipe(request, id):
    if request.method == "DELETE":
        try:
            recipe = Recipe.objects.get(id=id)
            if recipe.image and recipe.image.name != 'recipes/default.jpg':
                    recipe.image.delete(save=False)
            recipe.delete()
            return JsonResponse({"message": "Recipe deleted successfully"}, status=200)
        except Recipe.DoesNotExist:
            return JsonResponse({"error": "Recipe not found"}, status=404)
    return JsonResponse({"error": "Invalid request method"}, status=400)


def update_recipe(request, id):
    if request.method == "POST":
        try:
            # data = json.loads(request.body)
            recipe = Recipe.objects.get(id=id)
            recipe.title = request.POST.get("title", recipe.title)
            recipe.category = request.POST.get("category", recipe.category)
            recipe.ingredients = json.loads(request.POST.get("ingredients", recipe.ingredients))
            recipe.instructions = request.POST.get("instructions", recipe.instructions)
            recipe.servings = request.POST.get("servings", recipe.servings)
            recipe.time = request.POST.get("time", recipe.time)
            published = request.POST.get("published")
            if published is not None:
                recipe.published = published.lower() == "true"
            old_image = copy.deepcopy(recipe.image)
            recipe.image = request.FILES.get("image", recipe.image)
            if old_image != recipe.image and old_image.name != 'recipes/default.jpg':
                old_image.delete(save=False)
            recipe.save()
            return JsonResponse({"message": "Recipe updated successfully"}, status=200)
        except Recipe.DoesNotExist:
            return JsonResponse({"error": "Recipe not found"}, status=404)
    return JsonResponse({"error": "Invalid request method"}, status=400)