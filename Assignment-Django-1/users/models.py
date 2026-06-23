from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator

# Create your models here.

class CustomUser(AbstractUser):
    profile_image = models.ImageField(upload_to='profile_image', blank=True, default='profile_image/default.png')
    phone_number = models.CharField(
        max_length=17,
        blank=True,
        null=True,
        validators=[
            RegexValidator(
                regex=r'^\+?880\d{10}$',
                message="Enter a valid Bangladeshi number (e.g. +8801712345678)."
            )
        ]
    )
    bio = models.TextField(blank=True, null=True, max_length=500)
    
    def __str__(self):
        return self.username