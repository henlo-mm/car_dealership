from django.db import transaction
from django.http import JsonResponse
from rest_framework.viewsets import ModelViewSet
from rest_framework.parsers import MultiPartParser, FormParser

from ...models import Quote, User
from ...serializers import QuoteSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework.decorators import action
import json

class QuoteViewSet(ModelViewSet):
    queryset = Quote.objects.all()
    serializer_class = QuoteSerializer

    def list(self, request):
        quotes = Quote.objects.all().order_by('id')

        quote_data_list = []
        
        for quote in quotes:
            quote_data = {
                "id": quote.id,
                "validity": quote.validity,
                "description": quote.description,
                "price": quote.price,
                "car_plate": quote.car_plate,
                "soat": quote.soat,
                "window_tint": quote.window_tint,
                "car_plate_and_logo_fastening": quote.car_plate_and_logo_fastening,
                "roadside_kit": quote.roadside_kit,
                "fire_extinguisher": quote.fire_extinguisher,
                "first_aid_kit": quote.first_aid_kit,
                "created_at": quote.created_at,
                "vehicle": {
                    "id": quote.vehicle.id,
                    "model": quote.vehicle.model,
                    "make": quote.vehicle.make,
                    "is_for_sale": quote.vehicle.is_for_sale,
                },
                "client": {
                    "id": quote.client.id,
                    "name": quote.client.name,
                    "lastname": quote.client.lastname,
                },
                "seller": { 
                    "id": quote.seller.id,
                    "name": quote.seller.name,
                    "lastname": quote.seller.lastname,
                }
            }

            quote_data_list.append(quote_data)

        return JsonResponse(quote_data_list, safe=False) 
        
    @transaction.atomic
    def create(self, request, *args, **kwargs):
        data = request.data
        user_data = {}
        email = ""

        if 'emailuserCreated' in data:
            email = data.get('emailuserCreated')
        else:
            user_data = {
                'id': data.get('userId'),
                'address': data.get('address'),
                'document': data.get('document'),
                'name': data.get('name'),
                'lastname': data.get('lastName'),
                'email': data.get('email'),
                'role_id': int(data.get('role')),
                'branch_id': int(data.get('branch')),
            }

        quote_data = {
            'price': data.get('price'),
            'description': data.get('description'),
            'vehicle': data.get('vehicle'), 
            'car_plate': data.get('car_plate'),
            'car_plate_and_logo_fastening': data.get('car_plate_and_logo_fastening'),
            'fire_extinguisher': data.get('fire_extinguisher'),
            'first_aid_kit': data.get('first_aid_kit'),
            'roadside_kit': data.get('roadside_kit'),
            'soat': data.get('soat'),
            'window_tint': data.get('window_tint'),
            'seller': int(data.get('seller')),
        }



        if user_data:
            user_data.pop('id', None)
            user = User.objects.create(**user_data)
        else:
            user = User.objects.get(email=email)

        quote_data['client'] = user.id
        
        quote_serializer = QuoteSerializer(data=quote_data)

        if quote_serializer.is_valid():
            quote_serializer.save()
            return Response(quote_serializer.data, status=201)
        else:
            user.delete() 
            return Response(quote_serializer.errors, status=400)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        
        if not instance:
            return Response({'message': 'El registro no existe'}, status=404)
        
        self.perform_destroy(instance)
        return Response({'message': 'El registro se ha eliminado correctamente'}, status=204)