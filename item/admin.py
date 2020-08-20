from django.contrib import admin
from .models import *

admin.site.register(Category)
admin.site.register(SubCategory)
admin.site.register(Item)
admin.site.register(Tag)
admin.site.register(Feedback)
