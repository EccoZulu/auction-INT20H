# Generated by Django 4.1.7 on 2023-04-01 06:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_product_current_highest_bid_product_total_bids'),
    ]

    operations = [
        migrations.RenameField(
            model_name='product',
            old_name='current_highest_bid',
            new_name='currentHighestBid',
        ),
        migrations.RenameField(
            model_name='product',
            old_name='total_bids',
            new_name='totalBids',
        ),
    ]