from rest_framework import serializers
from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer as BaseUserRegistrationSerializer


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = '__all__'


class UserRegistrationSerializer(BaseUserRegistrationSerializer):

    class Meta(BaseUserRegistrationSerializer.Meta):
        fields = (
            'email',
            'first_name',
            'last_name', 
            'username', 
            'id',
            'status',
            'balance',
            'likes',
            'dislikes',
            'birthday',
            'date_joined'
        )
