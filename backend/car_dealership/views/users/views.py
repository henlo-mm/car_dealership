from django.http import HttpResponse, JsonResponse
from django.views import View
from django.contrib.auth.hashers import make_password
import json
from ...models import User


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


class UserView(View):

    def post(self, request):
        try:
            data = json.loads(request.body.decode('utf-8'))
            name = data.get('name')
            username = data.get('username')
            lastname = data.get('lastname')
            phone = data.get('phone')
            email = data.get('email')
            password = make_password(data.get('password'))
            branch_id = data.get('branch_id')
            role_id = data.get('role_id')

            user = User.objects.create(
                name=name,
                username=username,
                lastname=lastname,
                phone=phone,
                email=email,
                password=password,
                branch_id=branch_id,
                role_id=role_id
            )

            return HttpResponse(
                f"El usuario se ha creado correctamente con el id: {user.id}, Nombre: {user.name}, Rol: {user.role_id}")
        except json.JSONDecodeError:
            return HttpResponse("Ha ocurrido un error", status=400)

    def get(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
            user_data = {
                'id': user.id,
                'name': user.name,
                'username': user.username,
                'lastname': user.lastname,
                'phone': user.phone,
                'email': user.email,
                'branch_id': user.branch_id,
                'role_id': user.role_id
            }
            return JsonResponse(user_data)
        except json.JSONDecodeError:
            return HttpResponse("Ha ocurrido un error", status=400)
        except User.DoesNotExist:
            return JsonResponse({'error': 'El usuario no existe'}, status=404)

    def put(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
            data = json.loads(request.body.decode('utf-8'))
            user.name = data.get('name', user.name)
            user.username = data.get('username', user.username)
            user.lastname = data.get('lastname', user.lastname)
            user.phone = data.get('phone', user.phone)
            user.email = data.get('email', user.email)
            user.branch_id = data.get('branch_id', user.branch_id)
            user.role_id = data.get('role_id', user.role_id)
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
