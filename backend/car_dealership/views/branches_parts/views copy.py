from rest_framework.viewsets import ModelViewSet
from ...models import Quote
from ...serializers import QuoteSerializer

class QuoteViewSet(ModelViewSet):
    queryset = Quote.objects.all()
    serializer_class = QuoteSerializer
