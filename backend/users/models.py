from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    """extend user model"""

    birthday = models.DateField(null=True, blank=True)
    # profile_image = models.FileField()
    status = models.CharField(max_length=20, default='')
    balance = models.PositiveIntegerField(default=10000)
    likes = models.PositiveIntegerField(default=0)
    dislikes = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.username
