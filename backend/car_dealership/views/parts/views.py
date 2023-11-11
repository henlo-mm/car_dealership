from rest_framework.viewsets import ModelViewSet
from ...models import Part
from ...utils import upload_to_s3
from ...serializers import PartSerializer
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from django.core.files.base import ContentFile
class PartViewSet(ModelViewSet):
    queryset = Part.objects.all()
    serializer_class = PartSerializer

    @transaction.atomic
    def create(self, request, *args, **kwargs):
    
        data = request.data

        if data:
            if 'image' in data:
                image = ContentFile(data['image'].read(), name=data['image'].name)
                folder = "parts"

                image_url = upload_to_s3(image, folder)

                data['image'] = image_url

            serializer = PartSerializer(data=data)

            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
           serializer = PartSerializer(data=request.data)

           serializer.is_valid(raise_exception=True)
           serializer.save()
           return Response(serializer.data, status=status.HTTP_201_CREATED)
        
    def update(self, request, *args, **kwargs):
       partial = kwargs.pop('partial', False)
       instance = self.get_object()
       data = request.data

       if 'image' in data:
           image = ContentFile(data['image'].read(), name=data['image'].name)
           folder = "parts"

           image_url = upload_to_s3(image, folder)

           data['image'] = image_url

       serializer = self.get_serializer(instance, data=data, partial=partial)
       serializer.is_valid(raise_exception=True)
       self.perform_update(serializer)

       if getattr(instance, '_prefetched_objects_cache', None):
           instance._prefetched_objects_cache = {}

       return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        
        if not instance:
            return Response({'message': 'El registro no existe'}, status=404)
        
        self.perform_destroy(instance)
        return Response({'message': 'El registro se ha eliminado correctamente'}, status=204)
