from rest_framework.viewsets import ModelViewSet

from ...models import User
from ...serializers import UserSerializer
from rest_framework.response import Response

class UserViewSet(ModelViewSet):
    
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        
        if not instance:
            return Response({'message': 'El registro no existe'}, status=404)
        
        self.perform_destroy(instance)
        return Response({'message': 'El registro se ha eliminado correctamente'}, status=204)