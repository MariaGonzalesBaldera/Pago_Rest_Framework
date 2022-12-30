from django.contrib import admin
from .models import User
from pagos.models import Services,PaymentUser,Pagos

# Register your models here.
admin.site.register(User)
admin.site.register(Services)
admin.site.register(PaymentUser)
admin.site.register(Pagos)