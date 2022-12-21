from rest_framework import serializers
from .models import Pagos, PaymentUser, ExpiredPayments,Services

class PagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pagos
        fields ='__all__'
        read_only_fields = '__all__',

class PaymentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentUser
        fields ='__all__'
        read_only_fields = '__all__',

class ExpiredPaymentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpiredPayments
        fields ='__all__'
        read_only_fields = '__all__',

    
class ServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Services
        fields ='name','description','logo',
        # read_only_fields = '__all__',
        