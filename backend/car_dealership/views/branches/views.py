from rest_framework.viewsets import ModelViewSet

from ...models import Branch
from ...serializers import BranchSerializer
from rest_framework.response import Response

class BranchViewSet(ModelViewSet):
    
    queryset = Branch.objects.all()
    serializer_class = BranchSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        
        if not instance:
            return Response({'message': 'El registro no existe'}, status=404)
        
        self.perform_destroy(instance)
        return Response({'message': 'El registro se ha eliminado correctamente'}, status=204)