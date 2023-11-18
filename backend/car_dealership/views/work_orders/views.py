from django.db import transaction
from django.http import JsonResponse
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from ...models import WorkOrder, User, Vehicle
from ...serializers import WorkOrderSerializer
from rest_framework.response import Response
from rest_framework.decorators import action

class WorkOrderViewSet(ModelViewSet):
    queryset = WorkOrder.objects.all()
    serializer_class = WorkOrderSerializer

    def list(self, request):
        work_orders = WorkOrder.objects.all().order_by('id')

        work_orders_data_list = []
        
        for work_order in work_orders:
            work_order_data = {
                "id": work_order.id,
                "comments": work_order.comments,
                "description": work_order.description,
                "start_date": work_order.start_date,
                "is_available": work_order.is_available,
                "completion_date": work_order.completion_date,
                
                "status": {
                    "id": work_order.status.id,
                    "name": work_order.status.name,
                },
                "vehicle": {
                    "id": work_order.vehicle.id,
                    "model": work_order.vehicle.model,
                    "make": work_order.vehicle.make,
                    "is_for_sale": work_order.vehicle.is_for_sale,
                },
                "customer": {
                    "id": work_order.customer.id,
                    "name": work_order.customer.name,
                    "lastname": work_order.customer.lastname,
                },
                "workshop_manager": { 
                    "id": work_order.workshop_manager.id,
                    "name": work_order.workshop_manager.name,
                    "lastname": work_order.workshop_manager.lastname,
                }
            }
            work_orders_data_list.append(work_order_data)

        return JsonResponse(work_orders_data_list, safe=False) 

    @action(detail=False, methods=['get'])
    def list_by_user_document(self, request):
        user_document = request.query_params.get('document', None)

        if not user_document:
            return Response({'message': 'Parámetro document es requerido'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(document=user_document)
        except User.DoesNotExist:
            return Response({'message': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        except User.MultipleObjectsReturned:
            return Response({'message': 'Múltiples usuarios encontrados con el mismo documento'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        work_orders = WorkOrder.objects.filter(customer_id=user.id).order_by('id')

        work_orders_data_list = []
        
        for work_order in work_orders:
            work_order_data = {
                "id": work_order.id,
                "comments": work_order.comments,
                "description": work_order.description,
                "start_date": work_order.start_date,
                "is_available": work_order.is_available,
                "completion_date": work_order.completion_date,
                
                "status": {
                    "id": work_order.status.id,
                    "name": work_order.status.name,
                },
                "vehicle": {
                    "id": work_order.vehicle.id,
                    "model": work_order.vehicle.model,
                    "make": work_order.vehicle.make,
                    "is_for_sale": work_order.vehicle.is_for_sale,
                },
                "customer": {
                    "id": work_order.customer.id,
                    "name": work_order.customer.name,
                    "lastname": work_order.customer.lastname,
                },
                "workshop_manager": { 
                    "id": work_order.workshop_manager.id,
                    "name": work_order.workshop_manager.name,
                    "lastname": work_order.workshop_manager.lastname,
                }
            }
            work_orders_data_list.append(work_order_data)

        return JsonResponse(work_orders_data_list, safe=False)
    
    @action(detail=False, methods=['get'])
    def list_by_car_plate(self, request):

        car_plate = request.query_params.get('car_plate', None)

        if not car_plate:
            return Response({'message': 'Parámetro car_plate es requerido'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            vehicle = Vehicle.objects.get(car_plate__icontains=car_plate)

        except Vehicle.DoesNotExist:
            return Response({'message': 'Carro no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        except Vehicle.MultipleObjectsReturned:
            return Response({'message': 'Múltiples carros encontrados con la misma matrícula'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        work_orders = WorkOrder.objects.filter(vehicle_id=vehicle.id).order_by('id')

        work_orders_data_list = []
        
        for work_order in work_orders:
            work_order_data = {
                "id": work_order.id,
                "comments": work_order.comments,
                "description": work_order.description,
                "start_date": work_order.start_date,
                "is_available": work_order.is_available,
                "completion_date": work_order.completion_date,
                
                "status": {
                    "id": work_order.status.id,
                    "name": work_order.status.name,
                },
                "vehicle": {
                    "id": work_order.vehicle.id,
                    "model": work_order.vehicle.model,
                    "make": work_order.vehicle.make,
                    "is_for_sale": work_order.vehicle.is_for_sale,
                },
                "customer": {
                    "id": work_order.customer.id,
                    "name": work_order.customer.name,
                    "lastname": work_order.customer.lastname,
                },
                "workshop_manager": { 
                    "id": work_order.workshop_manager.id,
                    "name": work_order.workshop_manager.name,
                    "lastname": work_order.workshop_manager.lastname,
                }
            }
            work_orders_data_list.append(work_order_data)

        return JsonResponse(work_orders_data_list, safe=False)

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        serializer = WorkOrderSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        
        if not instance:
            return Response({'message': 'El registro no existe'}, status=404)
        
        self.perform_destroy(instance)
        return Response({'message': 'El registro se ha eliminado correctamente'}, status=204)