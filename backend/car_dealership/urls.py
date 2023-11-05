from django.urls import path, include
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token

from rest_framework.routers import DefaultRouter
from .views.users.views import *
#from .views.users.views2 import UserViewSet
from .views.auth.views import AuthView
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

    # All routers

    path('', include(router.urls)),

    # Debug
    path("__debug__/", include("debug_toolbar.urls")),
]
