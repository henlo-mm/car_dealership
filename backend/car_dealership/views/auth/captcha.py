from rest_framework.views import APIView
from rest_framework.response import Response
from django.conf import settings
import requests

class CaptchaView(APIView):
    def post(self, request):
        recaptcha_response = request.data.get('token')
        data = {
            'secret': settings.GOOGLE_CAPTCHA,
            'response': recaptcha_response
        }
        r = requests.post('https://www.google.com/recaptcha/api/siteverify', data=data)
        result = r.json()

        if result['success']:
            return Response({'status': 'Success'})
        else:
            return Response({'status': 'Failed'})