from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from item import views


urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^api/item/$', views.item_list),
    path('', include('frontend.urls')),
    # url(r'^api/customers/(?P<pk>[0-9]+)$', views.customers_detail),
]
