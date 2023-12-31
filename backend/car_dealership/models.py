# Create your models here.
from django.db import models

class Role(models.Model):
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        managed = True
        db_table = 'roles'

class Branch(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200, null=False)
    address = models.CharField(max_length=255, null=False)
    contact_name = models.CharField(max_length=200, null=False)
    phone = models.CharField(max_length=20, null=False)
    email = models.CharField(max_length=255, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        managed = True
        db_table = 'branches'
class User(models.Model):
    name = models.CharField(max_length=255)
    lastname = models.CharField(max_length=255)
    username = models.CharField(max_length=255)
    avatar = models.CharField(max_length=255, null=True)
    phone = models.CharField(max_length=15)
    second_phone = models.CharField(max_length=15)
    document = models.IntegerField()
    address = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=128)
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, default=1)
    role = models.ForeignKey(Role, on_delete=models.CASCADE, default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        managed = True
        db_table = 'users'

class Vehicle(models.Model):
    id = models.AutoField(primary_key=True)
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, default=1)
    model = models.CharField(max_length=200, null=False)
    image = models.CharField(max_length=255)
    make = models.CharField(max_length=200, null=False)
    car_plate = models.CharField(max_length=20, unique=True)
    color = models.CharField(max_length=200, null=False)
    year = models.IntegerField(null=False)
    is_for_sale = models.BooleanField(null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        managed = True
        db_table = 'vehicles'
    
class Part(models.Model):
    id = models.AutoField(primary_key=True)
    code = models.CharField(max_length=20, null=False)
    name = models.CharField(max_length=200, null=False)
    image = models.CharField(max_length=255)
    quantity = models.IntegerField(null=False)
    description = models.CharField(max_length=255, null=False)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        managed = True
        db_table = 'parts'

class BranchesParts(models.Model):
    id = models.AutoField(primary_key=True)
    part = models.ForeignKey(Part, on_delete=models.CASCADE, default=1)
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, default=1)
    quantity = models.IntegerField(null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        managed = True
        db_table = 'branches_parts'

class Quote(models.Model):
    id = models.AutoField(primary_key=True)
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, default=1)
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name='seller_quotes')
    client = models.ForeignKey(User, on_delete=models.CASCADE, related_name='client_quotes')
    validity = models.IntegerField(null=True)
    valid_date = models.DateField(null=True)
    description = models.TextField(null=False)
    price = models.DecimalField(max_digits=30, decimal_places=2, null=False)
    car_plate = models.BooleanField(default=False)
    soat = models.BooleanField(default=False)
    window_tint = models.BooleanField(default=False)
    car_plate_and_logo_fastening = models.BooleanField(default=False)
    roadside_kit = models.BooleanField(default=False)
    fire_extinguisher = models.BooleanField(default=False)
    first_aid_kit = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        managed = True
        db_table = 'quotes'

class Sale(models.Model):
    id = models.AutoField(primary_key=True)
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name='seller_sales')
    client = models.ForeignKey(User, on_delete=models.CASCADE, related_name='client_sales')
    price = models.DecimalField(max_digits=10, decimal_places=2, null=False)
    sale_date = models.DateTimeField(null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        managed = True
        db_table = 'sales'
    
class WorkOrderStatus(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        managed = True
        db_table = 'work_orders_statuses'

class WorkOrder(models.Model):
    id = models.AutoField(primary_key=True)
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, default=1)
    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='customer_work_orders', default=1)
    workshop_manager = models.ForeignKey(User, on_delete=models.CASCADE, related_name='workshop_manager_work_orders', default=1)
    description = models.CharField(max_length=255, null=False)
    comments = models.TextField(null=True)
    start_date = models.DateTimeField(null=False)
    status = models.ForeignKey(WorkOrderStatus, on_delete=models.CASCADE, default=1)
    is_available = models.BooleanField(null=False)
    completion_date = models.DateTimeField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        managed = True
        db_table = 'work_orders'