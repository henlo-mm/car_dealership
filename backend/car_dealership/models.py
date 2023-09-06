# Create your models here.
from django.db import models


class Role(models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'roles'


class User(models.Model):
    name = models.CharField(max_length=255)
    role_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'users'
