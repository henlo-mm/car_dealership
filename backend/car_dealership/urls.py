from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token

from .views.users.views import *
from .views.auth.views import AuthView

urlpatterns = [

    # Users
    path('users/', UserView.as_view(), name='index'),
    path('users/create', UserView.as_view(), name='create_user'),
    path('users/get/<int:user_id>', UserView.as_view(), name='get_user'),
    path('users/update/<int:user_id>', UserView.as_view(), name='update_user'),
    path('users/delete/<int:user_id>', UserView.as_view(), name='delete_user'),

    # Auth
    path('auth/login', AuthView.as_view(), name='login_user'),

    # JWT
    path('api-token-auth/', obtain_jwt_token),
    path('api-token-refresh/', refresh_jwt_token),
    path('api-token-verify/', verify_jwt_token),
]
