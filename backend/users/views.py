from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from django.contrib.auth import get_user_model
from users.serializers import UserSerializer

User = get_user_model()

class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]
