"""item views"""

import json

from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.views import APIView

from constants.item import CHANGING_FEILDS
from utils.responses import bad_request
from users.models import User
from users.serializers import UserSerializer
from .models import Tag, Category, SubCategory, Item
from .serializers import TagSerializer, CategorySerializer, SubCategorySerializer, ItemSerializer


class SideBar(APIView):
    """sidebar apiview"""

    permission_classes = [AllowAny]

    def get(self, request):
        """get sidbar content method"""

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
    """category view"""

    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        """get categories"""
        categories = Category.objects.all()
        serializer_categories = CategorySerializer(categories, many=True)

        return Response({
            "data": serializer_categories.data
        })

    def post(self, request):
        """create category"""

        category = request.data.get('category')

        serializer = CategorySerializer(data=category)

        if serializer.is_valid(raise_exception=True):
            serializer.save()

        return Response({
            'response': 'Success created subcategory ' + json.dumps(category["title"])
        })

class TagView(APIView):
    """tag view"""

    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        """get tags"""

        tags = Tag.objects.all()
        serializer_tags = TagSerializer(tags, many=True)

        return Response({
            "data": serializer_tags.data
        })

class SubCategoryView(APIView):
    """subcategory view"""

    permission_classes = [IsAuthenticatedOrReadOnly]

    def post(self, request):
        """create subcategory"""

        sub_category = request.data.get('sub_category')

        serializer = SubCategorySerializer(data=sub_category)

        if serializer.is_valid(raise_exception=True):
            serializer.save()

        return Response({
            'response': 'Success created subcategory ' + json.dumps(sub_category['title'])
        })

class ItemView(APIView):
    """item view"""

    permission_classes  = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        """get item(-s) method"""

        try:
            item_pk = request.query_params['pk']
        except KeyError:
            item_pk = -1

        if item_pk == -1:
            items = Item.objects.all()
            serializer_items = ItemSerializer(items, many=True)

            data = []

            for item in serializer_items.data:
                data.append(dict(item))

            for item in data:
                tags = []
                for tag in item['tags']:
                    tag_obj = Tag.objects.filter(id=tag)
                    tags.append(tag_obj[0].name)
                item['tags'] = tags

            return Response({
                'data': data
            })
        else:
            item = Item.objects.filter(id=item_pk)
            serializer_item = ItemSerializer(item, many=True)

            data = dict(serializer_item.data[0])
            tags = []
            for tag in data['tags']:
                tag_obj = Tag.objects.filter(id=tag)
                tags.append(tag_obj[0].name)
            data['tags'] = tags

            return Response({
                'data': data
            })


    def post(self, request):
        """create item method"""

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
            serializer.save()

        return Response({
            'response': 'Success created item ' + json.dumps(item['name']),
            'status': 'ok'
        })

    def put(self, request):
        """update item method"""

        try:
            item_pk = request.query_params['pk']
        except KeyError:
            return bad_request('no get params')

        try:
            item_pk = int(item_pk)
        except ValueError:
            return bad_request('pk must be a number')

        if item_pk < 1:
            return bad_request('pk must be above then zero')

        field = request.data.get('field')

        saved_items = Item.objects.filter(id=item_pk)

        if len(saved_items) == 0:
            return bad_request('no such item')
        else:
            saved_item = saved_items[0]

        if not saved_item.is_for_sell:
            return bad_request('this item not for selling')

        try:
            CHANGING_FEILDS[field]
        except Exception:
            return bad_request('not allowed field or not field')

        if field == 'user':
            if request.user.id == saved_item.user.id:
                return bad_request("you can't buy your own item")

            customer = User.objects.filter(id=request.user.id)[0]
            if customer.balance < saved_item.price:
                return bad_request('invalid field')
            else:
                seller = User.objects.filter(id=saved_item.user.id)[0]

                serializer_item = ItemSerializer(instance=saved_item, data={
                    'user': customer.id
                }, partial=True)

                serializer_customer = UserSerializer(instance=customer, data={
                    'balance': customer.balance - saved_item.price
                }, partial=True)

                serializer_seller = UserSerializer(instance=seller, data={
                    'balance': seller.balance + saved_item.price
                }, partial=True)

                if (
                    serializer_item.is_valid(raise_exception=True) and
                    serializer_customer.is_valid(raise_exception=True) and
                    serializer_seller.is_valid(raise_exception=True)
                   ):
                    saved_item = serializer_item.save()
                    customer = serializer_customer.save()
                    seller = serializer_seller.save()

                return Response({
                    'message': 'success busnes'
                }, status=200)

        return Response({
            'message': 'Server error'
        }, status=500)
