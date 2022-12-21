from . import api
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'pagos', api.PagoViewSet, 'pagos')
router.register(r'services', api.ServicesViewSet , 'services')
router.register(r'payment-user', api.PaymentUserViewSet, 'payment-user')
router.register(r'expired_payments', api.ExpiredPaymentsViewSet, 'expired_payments')

urlpatterns = router.urls