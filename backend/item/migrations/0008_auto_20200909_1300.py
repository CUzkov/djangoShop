# Generated by Django 3.1 on 2020-09-09 13:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('item', '0007_remove_item_created'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tag',
            name='name',
            field=models.CharField(max_length=70),
        ),
    ]
