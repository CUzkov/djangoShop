from rest_framework import serializers
from .models import Item, Category, SubCategory, Tag

class ItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = Item
        fields = ('id', 'name', 'price', 'description', 'created')

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ('id', 'title')

    def create(self, validated_data):
        return Category.objects.create(**validated_data)

class SubCategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = SubCategory
        fields = ('id', 'title', 'category')

class TagSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tag
        fields = ('id', 'name')
