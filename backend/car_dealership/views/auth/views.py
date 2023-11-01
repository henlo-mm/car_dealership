from rest_framework_jwt.settings import api_settings
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from ...models import User
from django.contrib.auth.hashers import check_password
import json
class AuthView(APIView):

  def post(self, request):
        
        try:
            data = json.loads(request.body.decode('utf-8'))

            email = data.get('email')
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
                return Response({'token': token, 'user': user}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'Credenciales incorrectas'}, status=status.HTTP_401_UNAUTHORIZED)


        except json.JSONDecodeError as e:
            error_message = str(e)
            return Response(f"Ha ocurrido un error en el JSON: {error_message}", status=400)