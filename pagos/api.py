from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import Pagos, PaymentUser, ExpiredPayments,Services
from rest_framework import viewsets, filters, permissions
from .serializers import PagoSerializer,PaymentUserSerializer,ExpiredPaymentsSerializer,ServicesSerializer
from rest_framework.permissions import IsAuthenticated
from .paginations import StandarResultsSetPagination
from rest_framework.response import Response

class PagoViewSet(viewsets.ModelViewSet):
    queryset = Pagos.objects.get_queryset().order_by('id')
    serializer_class = PagoSerializer
    pagination_class = StandarResultsSetPagination
    filter_backends =[filters.SearchFilter]
    # permission_classes =[permissions.IsAuthenticated]
    search_fields  = ['fecha_pago','servicio']
    throttle_scope = 'pagos'

class PaymentUserViewSet(viewsets.ModelViewSet):
    queryset = PaymentUser.objects.get_queryset().order_by('id')
    serializer_class = PaymentUserSerializer
    pagination_class = StandarResultsSetPagination
    # permission_classes =[permissions.IsAuthenticated]
    filter_backends =[filters.SearchFilter]
    search_fields  = ['paymentDate','expirationDate']

class ExpiredPaymentsViewSet(viewsets.ModelViewSet):
    queryset = ExpiredPayments.objects.get_queryset().order_by('id')
    serializer_class = ExpiredPaymentsSerializer
    pagination_class = StandarResultsSetPagination
    http_method_names = ['get','post']
    # permission_classes =[permissions.IsAuthenticated]

class ServicesViewSet(viewsets.ModelViewSet):
    queryset = Services.objects.get_queryset().order_by('id')
    serializer_class = ServicesSerializer
    pagination_class = StandarResultsSetPagination
    http_method_names = ['get']
    # permission_classes =[permissions.IsAuthenticated]