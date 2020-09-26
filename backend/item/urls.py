from item import views
from django.conf.urls import url


urlpatterns = [
    url('api/category/', views.CategoryView.as_view()),
    url('api/tag/', views.TagView.as_view()),
    url('api/sub_category/', views.SubCategoryView.as_view()),
    url('api/items/', views.ItemView.as_view()),

    url('api/sidebar/', views.SideBar.as_view()),
]