from django.db import transaction
from rest_framework.viewsets import ModelViewSet
from ...models import Quote
from ...serializers import QuoteSerializer, UserSerializer
from rest_framework.response import Response


class QuoteViewSet(ModelViewSet):
    queryset = Quote.objects.all()
    serializer_class = QuoteSerializer

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

        quote_data['seller'] =  request.data.get('user_id')
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