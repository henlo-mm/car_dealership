# Create your models here.
from django.db import models


class Role(models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'roles'


class User(models.Model):
    name = models.CharField(max_length=255)
    username = models.CharField(max_length=50)
    lastname = models.CharField(max_length=255)
    phone = models.CharField(max_length=15)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=128)
    branch_id = models.IntegerField()
    role_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'users'
