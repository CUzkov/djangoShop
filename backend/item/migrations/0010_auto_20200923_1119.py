# Generated by Django 3.1 on 2020-09-23 11:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('item', '0009_auto_20200923_1118'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='title',
            field=models.CharField(default='', max_length=20, unique=True),
        ),
        migrations.AddField(
            model_name='subcategory',
            name='title',
            field=models.CharField(default='', max_length=20, unique=True),
        ),
    ]
