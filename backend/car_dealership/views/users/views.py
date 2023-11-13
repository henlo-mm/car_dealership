from django.http import HttpResponse, JsonResponse
from django.views import View
from django.contrib.auth.hashers import make_password
import json
from ...models import User
from ...utils import upload_to_s3
from rest_framework import status
from django.db import transaction
from django.core.files.base import ContentFile
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
#comment
class UserView(APIView):

    def post(self, request):
        try:

            data = request.data

            name = data.get('name')
            address = data.get('address')
            second_phone = data.get('secondPhone')
            document = data.get('document')
            lastname = data.get('lastName')
            phone = data.get('phone')
            email = data.get('email')
            password = make_password(data.get('document'))
            branch_id = data.get('branch')
            role_id = data.get('role')

            image_data = data.get('avatar')
            if image_data:
                folder = "avatars"
                image_url = upload_to_s3(image_data, folder)
                image = image_url
            else:
                image = None

            user = User.objects.create(
                name=name,
                address=address,
                second_phone=second_phone,
                lastname=lastname,
                document=document,
                phone=phone,
                email=email,
                avatar=image,
                password=password,
                branch_id=branch_id,
                role_id=role_id
            )

            return HttpResponse(
                f"El usuario se ha creado correctamente con el id: {user.id}, Nombre: {user.name}, Rol: {user.role_id}")
        except json.JSONDecodeError:
            return HttpResponse("Ha ocurrido un error", status=400)

    def get(self, request, user_id=None):
        try:
            if user_id is not None:
                # Obtener un usuario específico
                user = User.objects.get(id=user_id)
                user_data = {
                    'id': user.id,
                    'name': user.name,
                    'address': user.address,
                    'secondPhone': user.second_phone,
                    'lastName': user.lastname,
                    'phone': user.phone,
                    'document': user.document,
                    'email': user.email,
                    'avatar': user.avatar,
                    'branch': user.branch_id,
                    'role': user.role_id
                }
                return JsonResponse(user_data)
            else:
                # Obtener todos los usuarios
                users = User.objects.all().order_by('id')
                user_data_list = []

                for user in users:
                    user_data = {
                        'id': user.id,
                        'name': user.name,
                        'address': user.address,
                        'secondPhone': user.second_phone,
                        'lastName': user.lastname,
                        'phone': user.phone,
                        'document': user.document,
                        'email': user.email,
                        'avatar': user.avatar,
                        'branch': user.branch_id,
                        'branch_name':  user.branch.name,
                        'role': user.role_id,
                        'role_name': user.role.name
                    }
                    user_data_list.append(user_data)

                return JsonResponse(user_data_list, safe=False) 
        except json.JSONDecodeError:
            return HttpResponse("Ha ocurrido un error", status=400)
        except User.DoesNotExist:
            return JsonResponse({'error': 'El usuario no existe'}, status=404)

    def put(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)

            data = request.data

            
            user.name = data.get('name', user.name)
            user.address = data.get('address')
            user.second_phone = data.get('secondPhone')
            user.lastname = data.get('lastName', user.lastname)
            user.phone = data.get('phone', user.phone)
            user.document = data.get('document', user.document)
            user.password = data.get('document', user.password)
            user.email = data.get('email', user.email)
           
            user.branch_id = data.get('branch', user.branch_id)
            user.role_id = data.get('role', user.role_id)


            image_data = data.get('avatar', user.avatar)

            if isinstance(image_data, str):
                user.avatar = image_data
            else:
            
                image_formatted = ContentFile(image_data.read(), name=image_data.name)
                folder = "avatars"

                image_url = upload_to_s3(image_formatted, folder)

                user.avatar = image_url

            user.save()

            return JsonResponse({'message': 'Usuario actualizado correctamente'})
        except json.JSONDecodeError as e:
            error_message = str(e)
            return HttpResponse(f"Ha ocurrido un error en el JSON: {error_message}", status=400)

    def delete(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
            user.delete()

            return JsonResponse({'message': 'Usuario eliminado correctamente'})
        except User.DoesNotExist:
            return HttpResponse("Ha ocurrido un error", status=404)
