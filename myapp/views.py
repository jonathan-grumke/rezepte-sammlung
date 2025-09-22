from django.http import JsonResponse
from django.shortcuts import render
import json
from django.contrib.auth import login, authenticate
from django.views.decorators.csrf import csrf_exempt, csrf_protect

# Create your views here.
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