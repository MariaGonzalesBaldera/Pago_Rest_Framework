from django.contrib import admin
from .models import User
from pagos.models import Services

# Register your models here.
admin.site.register(User)
admin.site.register(Services)