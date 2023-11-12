from rest_framework import serializers
from .models import Role, Branch, User, Vehicle, Part, BranchesParts, Quote, Sale, WorkOrderStatus, WorkOrder
    
class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'

class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

""" class AuthSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True) """
    
class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = '__all__'

class PartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Part
        fields = '__all__'

class BranchesPartsSerializer(serializers.ModelSerializer):
    class Meta:
        model = BranchesParts
        fields = '__all__'

class QuoteSerializer(serializers.ModelSerializer):

    valid_date = serializers.DateField(format="%d-%m-%Y")
    class Meta:
        model = Quote
        fields = '__all__'

class SaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sale
        fields = '__all__'

class WorkOrderStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkOrderStatus
        fields = '__all__'

class WorkOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkOrder
        fields = '__all__'
