from rest_framework import serializers
from .models import Item, Category, SubCategory, Tag


class ItemSerializer(serializers.ModelSerializer):
    """item serializer"""

    class Meta:
        model = Item
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    """category serializer"""

    class Meta:
        model = Category
        fields = ('id', 'title')

    def create(self, validated_data):
        return Category.objects.create(**validated_data)

class SubCategorySerializer(serializers.ModelSerializer):
    """subcategory serializer"""

    class Meta:
        model = SubCategory
        fields = ('id', 'title', 'category')

class TagSerializer(serializers.ModelSerializer):
    """tag serializer"""

    class Meta:
        model = Tag
        fields = ('id', 'name')
