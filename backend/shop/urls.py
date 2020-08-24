from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from item import views
from django.views.generic import RedirectView


urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^api/item/$', views.SideBar.as_view()),

    # path to djoser end points
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('testadmin/', include('users.urls')),
]
