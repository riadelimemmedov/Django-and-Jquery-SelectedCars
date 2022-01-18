from django.urls import path
from .views import *

app_name = 'orders' #! => note root url namespace value

urlpatterns = [
    path('',main_view,name='home'),
    path('cars-json/',get_json_car_data,name='cars-json'),
    path('models-json/<str:car>/',get_json_model_data,name='models-json'),
    path('create/',create_order,name='create')
]