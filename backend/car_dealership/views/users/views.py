from django.http import HttpResponse, JsonResponse
from django.views import View
from django.contrib.auth.hashers import make_password
import json
from ...models import User
#comment
class UserView(View):

    def post(self, request):
        try:
            data = json.loads(request.body.decode('utf-8'))
            name = data.get('name')
            address = data.get('address')
            second_phone = data.get('second_phone')
            lastname = data.get('lastname')
            phone = data.get('phone')
            email = data.get('email')
            password = make_password(data.get('password'))
            branch_id = data.get('branch_id')
            role_id = data.get('role_id')

            user = User.objects.create(
                name=name,
                address=address,
                second_phone=second_phone,
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

    def get(self, request, user_id=None):
        try:
            if user_id is not None:
                # Obtener un usuario específico
                user = User.objects.get(id=user_id)
                user_data = {
                    'id': user.id,
                    'name': user.name,
                    'address': user.address,
                    'second_phone': user.second_phone,
                    'lastname': user.lastname,
                    'phone': user.phone,
                    'email': user.email,
                    'branch_id': user.branch_id,
                    'role_id': user.role_id
                }
                return JsonResponse(user_data)
            else:
                # Obtener todos los usuarios
                users = User.objects.all()
                user_data_list = []

                for user in users:
                    user_data = {
                        'id': user.id,
                        'name': user.name,
                        'address': user.address,
                        'second_phone': user.second_phone,
                        'lastname': user.lastname,
                        'phone': user.phone,
                        'email': user.email,
                        'branch_id': user.branch_id,
                        'role_id': user.role_id
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
            data = json.loads(request.body.decode('utf-8'))
            user.name = data.get('name', user.name)
            user.address = data.get('address')
            user.second_phone = data.get('second_phone')
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
