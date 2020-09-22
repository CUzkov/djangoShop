from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny, IsAdminUser
from rest_framework.views import APIView
from rest_framework import status

from .models import *
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

    permission_classes = [IsAuthenticatedOrReadOnly]

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
            'response': 'Success created subcategory ' + json.dumps(category["title"])
        })

class TagView(APIView):

    permission_classes = [IsAuthenticatedOrReadOnly] 

    def get(self, request):

        tags = Tag.objects.all()
        serializer_tags = TagSerializer(tags, many=True)

        return Response({
            "data": serializer_tags.data
        })

class SubCategoryView(APIView):

    permission_classes = [IsAuthenticatedOrReadOnly]

    def post(self, request):

        sub_category = request.data.get('sub_category')

        serializer = SubCategorySerializer(data=sub_category)

        if serializer.is_valid(raise_exception=True):
            sub_category_saved = serializer.save()

        return Response({
            'response': 'Success created subcategory ' + json.dumps(sub_category['title'])
        })

class ItemView(APIView):

    permission_classes  = [IsAuthenticatedOrReadOnly]

    def get(self, request):

        items = Item.objects.all()
        serializer_items = ItemSerializer(items, many=True)

        return Response({
            'data': serializer_items.data
        })

    def post(self, request):

        item = request.data.get('item')

        sub_category_id = None
        new_tags = []

        if item['category']['id'] != -1:
            if item['category']['sub_category']['id'] != -1:
                sub_category_id = item['category']['sub_category']['id']
            else:
                serializer_sub_category = SubCategorySerializer(data={
                    'title': item['category']['sub_category']['new_title'],
                    'category': item['category']['id'],
                })
                if serializer_sub_category.is_valid(raise_exception=True):
                    sub_category_id = serializer_sub_category.save().id
        else:
            serializer_category = CategorySerializer(data={
                'title': item['category']['new_title'],
            })
            if serializer_category.is_valid(raise_exception=True):
                category_id = serializer_category.save().id

            serializer_sub_category = SubCategorySerializer(data={
                'title': item['category']['sub_category']['new_title'],
                'category': category_id,
            })
            if serializer_sub_category.is_valid(raise_exception=True):
                sub_category_id = serializer_sub_category.save().id

        
        for new_tag in item['new_tags']:

            serializer_tag = TagSerializer(data={
                'name': new_tag['name']
            })
            if serializer_tag.is_valid(raise_exception=True):
                tag_id = serializer_tag.save().id
                new_tags.append(tag_id)

        new_tags.extend(item['tags'])

        item_for_serialize = {
            'name': item['name'],
            'description': item['description'],
            'price': item['price'],
            'tags': new_tags,
            'sub_category': sub_category_id,
        }

        serializer = ItemSerializer(data=item_for_serialize)

        if serializer.is_valid(raise_exception=True):
            item_saved = serializer.save()

        return Response({
            'response': 'Success created item ' + json.dumps(item['name']),
            'status': 'ok'
        })
