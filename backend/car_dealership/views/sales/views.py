from django.http import JsonResponse
from rest_framework.viewsets import ModelViewSet
from ...models import Sale
from ...serializers import SaleSerializer
from rest_framework.response import Response

class SaleViewSet(ModelViewSet):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer

    def list(self, request):
        sales = Sale.objects.all().order_by('id')

        sale_data_list = []
        
        for sale in sales:
            sale_data = {
                "id": sale.id,
                "sale_date": sale.sale_date,
                "price": sale.price,
                "vehicle": {
                    "id": sale.vehicle.id,
                    "model": sale.vehicle.model,
                    "make": sale.vehicle.make,
                    "is_for_sale": sale.vehicle.is_for_sale,
                },
                "client": {
                    "id": sale.client.id,
                    "name": sale.client.name,
                    "lastname": sale.client.lastname,
                },
                "seller": { 
                    "id": sale.seller.id,
                    "name": sale.seller.name,
                    "lastname": sale.seller.lastname,
                }
            }
            sale_data_list.append(sale_data)

        return JsonResponse(sale_data_list, safe=False) 

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        
        if not instance:
            return Response({'message': 'El registro no existe'}, status=404)
        
        self.perform_destroy(instance)
        return Response({'message': 'El registro se ha eliminado correctamente'}, status=204)