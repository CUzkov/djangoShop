from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.views import APIView
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import Category, SubCategory
from .serializers import *

import json

class SideBar(APIView):
    """ Запрос получения категорий и подкатегорий товаров """

    permission_classes = [AllowAny]

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


class CategoryView(APIView):

    permission_classes = [AllowAny]

    def get(self, request):

        categories = Category.objects.all()
        serializer_categories = CategorySerializer(categories, many=True)

        return Response({
            "data": serializer_categories.data
        })        

    def post(self, request):

        category = request.data.get('category')

        serializer = CategorySerializer(data=category)

        if serializer.is_valid(raise_exception=True):
            category_saved = serializer.save()

        return Response({
            "Success": "Add category " + json.dumps(category["title"])
        })

class TagView(APIView):

    permission_classes = [AllowAny]

    def get(self, request):

        tags = Tag.objects.all()
        serializer_tags = TagSerializer(tags, many=True)

        return Response({
            "data": serializer_tags.data
        })
