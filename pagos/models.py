from django.db import models
from users.models import User
from django.utils.translation import gettext_lazy as _
class Services(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=200)
    logo = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Pagos(models.Model):
    # Create your models here.
    # class Servicios(models.TextChoices):
    #     NETFLIX   = 'NF', _('Netflix')
    #     AMAZON    = 'AP', _('Amazon Video')
    #     START     = 'ST', _('Start+')
    #     PARAMOUNT = 'PM', _('Paramount')

    # servicio = models.CharField(
    #     max_length=2,
    #     choices=Servicios.choices,
    #     default=Servicios.NETFLIX,
    # )
    fecha_pago = models.DateField()
    services_id = models.ForeignKey(Services, on_delete=models.CASCADE,related_name='services')
    monto      = models.FloatField(default=0.0)
########################################################

class PaymentUser(models.Model):
    amount = models.FloatField(default=0.0)
    paymentDate = models.DateField()
    expirationDate = models.DateField()
    usuario = models.ForeignKey(User, on_delete=models.CASCADE,related_name='users')
    services_id = models.ForeignKey(Services, on_delete=models.CASCADE,related_name='service')
    #validacion de fecha
    def validate_fecha(self,value):
        if self.expirationDate.month<self.paymentDate.month:            
            ExpiredPayments.objects.create()

class ExpiredPayments(models.Model):
    penalty_fee_amount = models.FloatField(default=0.0)
    payment_user_id = models.ForeignKey(PaymentUser, on_delete=models.CASCADE,related_name='payment_user')
    # services_id = models.ForeignKey(Services, on_delete=models.CASCADE,related_name='services')
