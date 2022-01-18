from django.db import models

# Create your models here.
class Car(models.Model):
    name = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    
    #Example => Mercedes - Almanya
    
    def __str__(self):
        return str(self.name)