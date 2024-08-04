from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        
        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser):
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)  # Indicates if the user is active
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    # ahduni@WMC/LLS password for supabase database
    # ahduni@WMC/LLS

    def __str__(self):
        return self.email

    def get_inventory(self):
        yachts = self.yachts.all()
        penthouses = self.penthouses.all()
        aircrafts = self.aircrafts.all()
        automobiles = self.automobiles.all()
        return list(yachts) + list(penthouses) + list(aircrafts) + list(automobiles)
    
class Profile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, verbose_name="User", related_name='profile')
    first_name = models.CharField(max_length=50, null=False, default = "", verbose_name="First Name")
    last_name = models.CharField(max_length=50, null=False, default = "", verbose_name="Last Name")
    photo_link = models.URLField(max_length=200, blank=True, null=True, verbose_name="Photo Link")
    phone_number = models.IntegerField(blank=True, null=True, verbose_name="Phone Number")
    age = models.SmallIntegerField(blank=True, null=True, verbose_name="Age")
    gender_choices = [
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other'),
    ]
    gender = models.CharField(max_length=6, choices=gender_choices, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    date_field = models.DateField(auto_now_add=True)
    bank_balance = models.PositiveBigIntegerField(default=0, null=False)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'

    
    class Meta:
        verbose_name = "Profile"
        verbose_name_plural = "Profiles"