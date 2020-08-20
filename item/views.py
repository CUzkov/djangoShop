from django.shortcuts import render

def index(request):

    print(Product.objects.filter(tags__name='L2'))

    return render(request, 'item.html')
