from django.conf.urls import url
from item import views

urlpatterns = [
    url('', views.index, name='landing'),
]