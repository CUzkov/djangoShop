from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import Category, SubCategory
from .serializers import *


class SideBar(APIView):
    """ Запрос получения категорий и подкатегорий товаров """

    def get(self, request):
        
        categories = Category.objects.all()
        sub_categories = SubCategory.objects.all()
        serializer_category = CategorySerializer(categories, many=True)
        serializer_sub_category = SubCategorySerializer(sub_categories, many=True)

        response = {
            "data": []
        }

        for category in serializer_category.data:
            response["data"].append(dict(category))

        for sub_category in serializer_sub_category.data:

            dict_sub_category = dict(sub_category)

            for category in response["data"]:
                if category["id"] == dict_sub_category["category"]:
                    if not category.get("sub_categories"):
                        category["sub_categories"] = [dict_sub_category]
                    else:
                        category["sub_categories"].append(dict_sub_category)

        return Response(response)


