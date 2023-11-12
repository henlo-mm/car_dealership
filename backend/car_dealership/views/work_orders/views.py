from django.db import transaction
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from ...models import WorkOrder
from ...serializers import WorkOrderSerializer
from rest_framework.response import Response

class WorkOrderViewSet(ModelViewSet):
    queryset = WorkOrder.objects.all()
    serializer_class = WorkOrderSerializer

    def list(self, request):
        work_orders = WorkOrder.objects.all().order_by('id')
        serializer = self.get_serializer(work_orders, many=True)
        return Response(serializer.data)

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