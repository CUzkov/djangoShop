from django.db import models


class User(models.Model):

    name = models.CharField(max_length=20)
    second_name = models.CharField(max_length=20)
    email = models.EmailField(blank=False)
    # profile)image = models.FileField()
    status = models.CharField(max_length=20)
    balance = models.PositiveIntegerField(default=0)
    login = models.CharField(max_length=20)
    password = models.CharField(max_length=20)
    created = models.DateTimeField(blank=True, null=True)
    last_login = models.DateTimeField(blank=True, null=True)
    likes = models.PositiveIntegerField(default=0)
    dislikes = models.PositiveIntegerField(default=0)

    role = models.OneToOneField('Role', on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'

    def __str__(self):
        return self.login

class Role(models.Model):

    name = models.CharField(max_length=20)

    class Meta:
        verbose_name = 'role'
        verbose_name_plural = 'roles'

    def __str__(self):
        return self.name

