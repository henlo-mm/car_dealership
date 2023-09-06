from django.http import HttpResponse
from django.views import View
import json
from ...models import User


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


class UserView(View):
    def post(self, request):
        try:
            data = json.loads(request.body.decode('utf-8'))
            name = data.get('name')
            role_id = data.get('role_id')

            user = User.objects.create(name=name, role_id=role_id)

            return HttpResponse(f"El usuario se ha creado correctamente con el id: {user.id}, Nombre: {user.name}, Rol: {user.role_id}")
        except json.JSONDecodeError:
            return HttpResponse("Ha ocurrido un error", status=400)