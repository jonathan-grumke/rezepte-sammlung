from django.urls import path
from . import views

urlpatterns = [
    path(route='login', view=views.login_user, name='login'),
]