from django.urls import path

from .views.users.views import *

urlpatterns = [
    # path('', index, name='index'),
    path('users/', index, name='index'),
    path('users/create', UserView.as_view(), name='create_user'),

]
