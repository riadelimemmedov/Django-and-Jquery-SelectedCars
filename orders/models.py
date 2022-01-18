from django.db import models
from cars.models import Car
from models.models import Model
# Create your models here.

class Order(models.Model):
    car = models.ForeignKey(Car,on_delete=models.CASCADE)
    models = models.ForeignKey(Model,on_delete=models.CASCADE)

    def __str__(self):
        return str(self.pk)