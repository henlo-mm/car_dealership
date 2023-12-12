from django.urls import path, include, re_path
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.conf.urls.static import static
from django.conf import settings

from rest_framework.routers import DefaultRouter
from .views.users.views import *
#from .views.users.views2 import UserViewSet
from .views.auth.views import AuthView
from .views.auth.captcha import CaptchaView
from .views.branches.views import BranchViewSet
from .views.vehicles.views import VehicleViewSet
from .views.parts.views import PartViewSet
from .views.branches_parts.views import BranchesPartsViewSet
from .views.quotes.views import QuoteViewSet
from .views.sales.views import SaleViewSet
from .views.work_orders_statuses.views import WorkOrderStatusViewSet
from .views.work_orders.views import WorkOrderViewSet

# Register default routes

router = DefaultRouter()
router.register(r'branches', BranchViewSet)
#router.register(r'users', UserViewSet)
router.register(r'vehicles', VehicleViewSet)
router.register(r'parts', PartViewSet)
router.register(r'branches_parts', BranchesPartsViewSet)
router.register(r'quotes', QuoteViewSet)
router.register(r'sales', SaleViewSet)
router.register(r'work_order_statuses', WorkOrderStatusViewSet)
router.register(r'work_orders', WorkOrderViewSet)


schema_view = get_schema_view(
  openapi.Info(
     title="Snippets API",
     default_version='v1',
     description="Test description",
     terms_of_service="https://www.google.com/policies/terms/",
     contact=openapi.Contact(email="contact@snippets.local"),
     license=openapi.License(name="BSD License"),
  ),
  public=True,
  permission_classes=(permissions.AllowAny,),
)


urlpatterns = [

    # Users
    path('users/', UserView.as_view(), name='index'),
    path('users/create', UserView.as_view(), name='create_user'),
    path('users/get/<int:user_id>', UserView.as_view(), name='get_user'),
    path('users/update/<int:user_id>', UserView.as_view(), name='update_user'),
    path('users/delete/<int:user_id>', UserView.as_view(), name='delete_user'),


    # Auth
    path('auth/login', AuthView.as_view(), name='login_user'),
    path('captcha/verify', CaptchaView.as_view(), name='verify_captcha'),

    # JWT
    path('api-token-auth/', obtain_jwt_token),
    path('api-token-refresh/', refresh_jwt_token),
    path('api-token-verify/', verify_jwt_token),

    # All routers

    path('', include(router.urls)),

    # Debug
    path("__debug__/", include("debug_toolbar.urls")),

    # Api docs

    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

if settings.DEBUG:
  urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)