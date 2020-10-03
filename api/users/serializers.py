"""user models serializer classes"""

from rest_framework import serializers
from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer as BaseUserRegistrationSerializer


class UserSerializer(serializers.ModelSerializer):
    """user serializer"""

    def update(self, instance, validated_data):
        instance.birthday = validated_data.get('birthday', instance.birthday)
        instance.status = validated_data.get('status', instance.status)
        instance.balance = validated_data.get('balance', instance.balance)
        instance.likes = validated_data.get('likes', instance.likes)
        instance.dislikes = validated_data.get('dislikes', instance.dislikes)

        instance.save()

        return instance


    class Meta:
        model = get_user_model()
        fields = '__all__'


class UserRegistrationSerializer(BaseUserRegistrationSerializer):

    class Meta(BaseUserRegistrationSerializer.Meta):
        fields = (
            'email',
            'password',
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
