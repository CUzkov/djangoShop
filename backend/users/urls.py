from django.conf.urls import url
from .views import UserList


urlpatterns = [
    url('users/', UserList.as_view())
]