from django.db import transaction
from django.http import JsonResponse
from rest_framework.viewsets import ModelViewSet
from ...models import Quote
from ...serializers import QuoteSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework.decorators import action

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
                "first_aid_kit": quote.fire_extinguisher,
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
        user_data = request.data.get('user_data')
        quote_data = request.data.get('quote_data')

        user_serializer = UserSerializer(data=user_data)

        if user_serializer.is_valid():
            user = user_serializer.save()
            
            quote_data['client'] = user.id
        else:
            return Response(user_serializer.errors, status=400)

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