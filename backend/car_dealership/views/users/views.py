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
            second_phone = data.get('secondPhone')
            document = data.get('document')
            lastname = data.get('lastName')
            phone = data.get('phone')
            email = data.get('email')
            password = make_password(data.get('password'))
            branch_id = data.get('branch')
            role_id = data.get('role')

            user = User.objects.create(
                name=name,
                address=address,
                second_phone=second_phone,
                lastname=lastname,
                document=document,
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
                    'secondPhone': user.second_phone,
                    'lastName': user.lastname,
                    'phone': user.phone,
                    'document': user.document,
                    'email': user.email,
                    'branch': user.branch_id,
                    'role': user.role_id
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
                        'secondPhone': user.second_phone,
                        'lastName': user.lastname,
                        'phone': user.phone,
                        'document': user.document,
                        'email': user.email,
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
            data = json.loads(request.body.decode('utf-8'))
            user.name = data.get('name', user.name)
            user.address = data.get('address')
            user.second_phone = data.get('secondPhone')
            user.lastname = data.get('lastName', user.lastname)
            user.phone = data.get('phone', user.phone)
            user.document = data.get('document', user.document)
            user.email = data.get('email', user.email)
            user.branch_id = data.get('branch', user.branch_id)
            user.role_id = data.get('role', user.role_id)
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
