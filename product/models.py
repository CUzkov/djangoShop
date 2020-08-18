from django.db import models


class Product(models.Model):

    name = models.CharField(max_length=20, null=False, blank=False)
    price = models.PositiveIntegerField(null=False, blank=False, default=0)
    description = models.TextField(null=False, blank=True)
    quantity = models.PositiveIntegerField(default=0, null=False, blank=False)

    class Meta:
        verbose_name = 'product'
        verbose_name_plural = 'products'

    def __str__(self):
        return self.name
