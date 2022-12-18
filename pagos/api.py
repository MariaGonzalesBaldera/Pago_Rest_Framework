from .models import Pagos
from rest_framework import viewsets, filters, permissions
from .serializers import PagoSerializer
from rest_framework.permissions import IsAuthenticated
from .paginations import StandarResultsSetPagination

class PagoViewSet(viewsets.ModelViewSet):
    queryset = Pagos.objects.get_queryset().order_by('id')
    serializer_class = PagoSerializer
    pagination_class = StandarResultsSetPagination
    filter_backends =[filters.SearchFilter]
    permission_classes =[permissions.IsAuthenticated]

    search_fields  = ['usuario_id','fecha_pago','servicio']
    throttle_scope = 'pagos'