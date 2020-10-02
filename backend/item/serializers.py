"""item models serializer classes"""

from rest_framework import serializers
from .models import Item, Category, SubCategory, Tag


class ItemSerializer(serializers.ModelSerializer):
    """item serializer"""

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.price = validated_data.get('price', instance.price)
        instance.description = validated_data.get('description', instance.description)
        instance.likes = validated_data.get('likes', instance.likes)
        instance.dislikes = validated_data.get('dislikes', instance.dislikes)
        instance.is_for_sell = validated_data.get('is_for_sell', instance.is_for_sell)
        instance.user = validated_data.get('user', instance.user)

        instance.save()

        return instance


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
