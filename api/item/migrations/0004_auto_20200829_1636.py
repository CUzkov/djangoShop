# Generated by Django 3.1 on 2020-08-29 16:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('item', '0003_changeownerlist_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='title',
            field=models.CharField(default='', max_length=20, unique=True),
        ),
    ]
