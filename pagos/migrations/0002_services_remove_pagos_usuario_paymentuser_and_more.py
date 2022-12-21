# Generated by Django 4.1.4 on 2022-12-20 13:47

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('pagos', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Services',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.CharField(max_length=200)),
                ('logo', models.CharField(max_length=200)),
            ],
        ),
        migrations.RemoveField(
            model_name='pagos',
            name='usuario',
        ),
        migrations.CreateModel(
            name='PaymentUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.FloatField(default=0.0)),
                ('paymentDate', models.DateField()),
                ('expirationDate', models.DateField()),
                ('services_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='services', to='pagos.services')),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='users', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ExpiredPayments',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('penalty_fee_amount', models.FloatField(default=0.0)),
                ('payment_user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='payment_user', to='pagos.paymentuser')),
            ],
        ),
    ]