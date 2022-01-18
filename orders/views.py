from django.db import models
from django.shortcuts import render
from django.http import JsonResponse
from models.models import Model
from .models import Car, Order
from cars.models import Car

# Create your views here.

#!HomePage
def main_view(request):
    qs = Car.objects.all()
    
    context = {
        'qs':qs,
    }
    return render(request,'orders/main.html',context)

#!Get Request
def get_json_car_data(request):
    qs_val = list(Car.objects.values())   
    return JsonResponse({'data':qs_val,})

#!Get Request
def get_json_model_data(request,*args,**kwargs):
    selected_car = kwargs.get('car')#url from jquery url
    obj_models = list(Model.objects.filter(car__name = selected_car).values())
    return JsonResponse({'dataModel':obj_models})#send js

#!My Ajax Function
def is_ajax(request):
    return request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest'

#!Post Request
def create_order(request):
    if is_ajax: #or => #* if is_ajax(request=request) => it does not matter
        car = request.POST.get('car')
        car_obj = Car.objects.get(name=car)
        model = request.POST.get('model')
        model_obj = Model.objects.get(name=model)
        Order.objects.create(car=car_obj,models=model_obj)
        return JsonResponse({'created':True})
    return JsonResponse({'created':False},safe=False)








