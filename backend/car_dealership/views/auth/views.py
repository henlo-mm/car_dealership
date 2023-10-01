from rest_framework_jwt.settings import api_settings
from django.http import HttpResponse, JsonResponse
from django.views import View
from django.contrib.auth.hashers import check_password
from ...models import User
import json


class AuthView(View):

    def post(self, request):
        try:
            data = json.loads(request.body.decode('utf-8'))

            email = data.get('email')
            print(email)
            password = data.get('password')

            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                user = None

            if user is not None and check_password(password, user.password):
                jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER

                jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

                payload = jwt_payload_handler(user)
                token = jwt_encode_handler(payload)
                print(payload)

                return JsonResponse({'token': token})

            return JsonResponse({'message': 'Credenciales incorrectas'}, status=401)

        except json.JSONDecodeError as e:
            error_message = str(e)
            return HttpResponse(f"Ha ocurrido un error en el JSON: {error_message}", status=400)
