from django.db import models


class Category(models.Model):

    title = models.CharField(max_length=20, blank=False, default='')

    class Meta:
        verbose_name = 'category'
        verbose_name_plural = 'categories'

    def __str__(self):
        return self.title

class SubCategory(models.Model):

    title = models.CharField(max_length=20, blank=False, default='')

    category = models.ForeignKey('Category', on_delete=models.CASCADE, default='id')

    class Meta:
        verbose_name = 'sub-category'
        verbose_name_plural = 'sub-categories'

    def __str__(self):
        return str(self.id)

class Product(models.Model):

    name = models.CharField(max_length=20, blank=False, default='')
    price = models.PositiveIntegerField(blank=False, default=0)
    description = models.TextField(blank=True, default='')
    quantity = models.PositiveIntegerField(blank=False, default=0)
    likes = models.PositiveIntegerField(default=0, blank=False)
    dislikes = models.PositiveIntegerField(default=0, blank=False)

    sub_category = models.ForeignKey('SubCategory', on_delete=models.CASCADE, default='id')
    tags = models.ManyToManyField(
        'Tag',
        blank=True
    )

    class Meta:
        verbose_name = 'product'
        verbose_name_plural = 'products'

    def __str__(self):
        return self.name

class Tag(models.Model):

    TAGS = [
        ('L1', 'Level 1'),
        ('L2', 'Level 2'),
        ('L3', 'Level 3')
    ]

    name = models.CharField(
        blank=False,
        max_length=2,
        choices=TAGS
    )

    class Meta:
        verbose_name = 'tag'
        verbose_name_plural = 'tags'

    def __str__(self):
        return self.name

class Feedback(models.Model):

    text = models.TextField(blank=False, default='')
    created = models.DateTimeField(blank=True, null=True)
    updated = models.DateTimeField(blank=True, null=True)

    product = models.ForeignKey('Product', on_delete=models.CASCADE, default='id')

    class Meta:
        verbose_name = 'feedback'
        verbose_name_plural = 'feedbacks'