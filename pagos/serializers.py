from rest_framework import serializers
from .models import Pagos, PaymentUser, ExpiredPayments,Services


class ServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Services
        fields ='id','name','description','logo',
                

class PagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pagos
        fields ='__all__'
        read_only_fields = '__all__',

    def to_representation(self, instance):
        return {
            'id':instance.id,
            'monto':instance.monto,
            'fecha_pago':instance.fecha_pago,
            'name':instance.services_id.name,
            'services_id':instance.services_id.id,
            'logo':instance.services_id.logo,
            # 'logo' : instance.services_id.logo,

        }

class PaymentUserSerializer(serializers.ModelSerializer):
    # name = serializers.StringRelatedField()
    class Meta:
        model = PaymentUser
        fields ='__all__'

    def to_representation(self, instance):
        return {
            'amount':instance.amount,
            'paymentDate':instance.paymentDate,
            'expirationDate':instance.expirationDate,
            'usuario':instance.usuario.username,
            'services_id':instance.services_id.name,
            'logo':instance.services_id.logo,
        } 

class ExpiredPaymentsSerializer(serializers.ModelSerializer):
    logo = serializers.StringRelatedField(many=True)

    class Meta:
        model = ExpiredPayments
        fields ='__all__'
        read_only_fields = '__all__',

    def to_representation(self, instance):
        return {
            'id':instance.id,
            'penalty_fee_amount':instance.penalty_fee_amount,
            'expirationDate':instance.payment_user_id.expirationDate,
            'amount':instance.payment_user_id.amount,
            'logo':instance.payment_user_id.services_id.logo,
            'name':instance.payment_user_id.services_id.name,

        }     
