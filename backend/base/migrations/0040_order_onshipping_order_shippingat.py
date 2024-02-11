# Generated by Django 4.2 on 2023-06-22 07:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0039_useraddress_firstname_useraddress_lastname'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='onShipping',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='order',
            name='shippingAt',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]