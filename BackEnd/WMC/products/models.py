from django.db import models, transaction
from django.core.exceptions  import ValidationError
from users.models import CustomUser
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType
from django.utils import timezone

# Create your models here.

class BaseProduct(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='%(class)s_products')
    title = models.CharField(max_length=200, default="")
    description = models.TextField(default="")
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    listed_at = models.DateTimeField(auto_now_add=True)
    images = GenericRelation('ProductImage', related_query_name='product')
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.00)

    class Meta:
        abstract = True
        
    def clean(self):
        if not (2 <= self.images.count() <= 8):
            raise ValidationError('Each product must have between 2 and 8 images.')
        
    def update_rating(self):
        ratings = Rating.objects.filter(purchase__product=self)
        if ratings.exists():
            self.rating = ratings.aggregate(models.Avg('rating'))['rating__avg']
            self.save()

    def get_ratings(self):
        purchases = Purchases.objects.filter(product=self)
        ratings = Rating.objects.filter(purchase__in=purchases)
        return ratings
    

    def get_sale_status(self):
        total_purchased = Purchases.objects.filter(product=self).aggregate(total=models.Sum('quantity'))['total'] or 0
        product_quantity = getattr(self, 'quantity', 1)
        if total_purchased >= product_quantity:
            return "Sold"
        elif total_purchased > 0:
            return f"In-Stock (Sold {total_purchased}/{product_quantity})"
        return "Not Sold"

    def get_all_buyers_and_dates(self):
        purchases = Purchases.objects.filter(product=self).order_by('purchased_at')
        buyers_and_dates = [(purchase.user.profile.first_name + " " + purchase.user.profile.last_name, purchase.purchased_at) for purchase in purchases]
        return buyers_and_dates

    def __str__(self):
        return self.title

class Yacht(BaseProduct):
    
    YACHT_TYPE_CHOICES = [
        (1, 'Sail'),
        (2, 'Power'),
    ]

    HULL_MATERIAL_CHOICES = [
        (1, 'Aluminum'),
        (2, 'Composite'),
        (3, 'Ferro-Cement'),
        (4, 'Fiberglass'),
        (5, 'Wood'),
        (6, 'PVC'),
        (7, 'Steel'),   
        (8, 'Other'),
    ]

    FUEL_TYPE_CHOICES = [
        (1, 'Diesel'),
        (2, 'Electric'),
        (3, 'Petrol'),
    ]

    NUMBER_OF_ENGINES = [
        (0, '0'),
        (1, '1'),
        (2, '2'),
        (3, '3'),
        (4, '4'),
        (5, '4+'),
    ]


    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='yachts')
    yacht_type = models.IntegerField(choices=YACHT_TYPE_CHOICES)
    hull_material = models.IntegerField(choices=HULL_MATERIAL_CHOICES)
    fuel_type = models.IntegerField(choices=FUEL_TYPE_CHOICES)
    length = models.SmallIntegerField(default=0)
    beam = models.SmallIntegerField(default=0)
    number_of_engines = models.IntegerField(choices= NUMBER_OF_ENGINES)
    delivery_date = models.DateField(auto_now_add=False)
    quantity = models.SmallIntegerField(default=1)
    features = models.ManyToManyField('Feature', through='YachtFeature', related_name='yachts')

    def get_yacht_type_display(self):
        return dict(self.YACHT_TYPE_CHOICES).get(self.yacht_type, 'Unknown')
        
    def get_fuel_type_display(self):
        return dict(self.FUEL_TYPE_CHOICES).get(self.fuel_type, 'Unknown')
        
    def get_hull_material_display(self):
        return dict(self.HULL_MATERIAL_CHOICES).get(self.hull_material, 'Unknown')
        
    def get_number_of_engines_display(self):
        return dict(self.NUMBER_OF_ENGINES).get(self.number_of_engines, 'Unknown')
    
    def __str__(self):
        return f"{self.user.profile.first_name}'s {self.get_yacht_type_display()} Yacht"
    
    def clean(self):
        super().clean()
        for feature in self.features.all():
            if feature.category != FeatureCategory.YACHT:
                raise ValidationError(f"Feature '{feature.name}' is not applicable for yachts.")

class PentHouse(BaseProduct):
    
    FURNISHING_CHOICES = [
        (1, 'Semi-furnished'),
        (2, 'Unfurnished'),
        (3, 'Furnished')
    ]

    FACING_CHOICES = [
        (1, 'East'),
        (2, 'North'),
        (3, 'North - East'),
        (4, 'North - West'),
        (5, 'South'),
        (6, 'South - East'),
        (7, 'South - West'),
        (8, 'West')
    ]

    LOCATION_CHOICES = [
        (1, 'Vinewood'),
        (2, 'South Los Santos'),
        (3, 'West Vinewood'),
        (4, 'Paleto Bay'),
        (5, 'Blaine County'),
        (6, 'Mission Row'),
        (7, 'Rockford Hills'),
        (8, 'Del Perro'),
        (9, 'Sandy Shores'),
        (10, 'Los Santos International Airport (LSIA)'),
        (11, 'Chumash'),
        (12, 'Davis'),
        (13, 'East Vinewood'),
        (14, 'Grapeseed'), 
        (15, 'Other') 
    ]

    
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='penthouses')
    house_address = models.CharField(null=False, default="")
    bhk = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(10)])
    covered_area = models.PositiveSmallIntegerField()
    furnishing = models.IntegerField(choices=FURNISHING_CHOICES)
    bathrooms = models.SmallIntegerField(validators=[MinValueValidator(0), MaxValueValidator(15)])
    facing = models.SmallIntegerField(choices=FACING_CHOICES)
    location = models.IntegerField(choices=LOCATION_CHOICES)
    features = models.ManyToManyField('Feature', through='PenthouseFeature', related_name='penthouses')

    def __str__(self):
        return f"{self.user.profile.first_name}'s Penthouse "

    def get_location_display(self):
        return dict(self.LOCATION_CHOICES).get(self.location, 'Unknown')
        
    def get_facing_display(self):
        return dict(self.FACING_CHOICES).get(self.facing, 'Unknown')

    def get_furnishing_display(self):
        return dict(self.FURNISHING_CHOICES).get(self.furnishing, 'Unknown')
        
    def clean(self):
        super().clean()
        for feature in self.features.all():
            if feature.category != FeatureCategory.PENTHOUSE:
                raise ValidationError(f"Feature '{feature.name}' is not applicable for penthouses.")

class Aircraft(BaseProduct):
    PLANE_TYPE_CHOICES = [
        (1, 'Helicopter'),
        (2, 'Heavy Jet'),
        (3, 'Light Jet'),
        (4, 'Midsize Jet'),
        (5, 'Large Cabin'),
        (6, 'Piston Single'),
        (7, 'Piston Twin'),
        (8, 'Super Heavy Jet'),
        (9, 'Super Light Jet'),
        (10, 'Super Midsize Jet'),
        (11, 'Turbo Prop'),
        (12, 'Other')
    ]

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='aircrafts')
    plane_type = models.IntegerField(choices=PLANE_TYPE_CHOICES)
    passenger_capacity = models.SmallIntegerField(validators=[MinValueValidator(2), MaxValueValidator(150)])
    delivery_date = models.DateField(auto_now_add=False)
    quantity = models.SmallIntegerField(default=1)
    features = models.ManyToManyField('Feature', through='AircraftFeature', related_name='aircrafts')

    def __str__(self):
        return f"{self.user.profile.first_name}'s {self.get_plane_type_display()} Aircraft"
    
    def get_plane_type_display(self):
        return dict(self.PLANE_TYPE_CHOICES).get(self.plane_type, 'Unknown')

    def clean(self):
        super().clean()
        for feature in self.features.all():
            if feature.category != FeatureCategory.AIRCRAFT:
                raise ValidationError(f"Feature '{feature.name}' is not applicable for aircrafts.")
    
class Automobile(BaseProduct):
    
    AUTOMOBILE_TYPE_CHOICES = [
        (1, 'Bike'),
        (2, 'Car')
    ]

    BODY_TYPE_CHOICES = [
        (1, 'Sports'),
        (2, 'SUV'),
        (3, 'Sedan'),
        (4, 'Hatchback'),
        (5, 'MUV'),
        (6, 'Compact Sedan'),
        (7, 'Compact SUV'),
        (8, 'Convertible'),
        (9, 'Coupe'),
        (10, 'Station Wagon'),
        (11, 'Minivan'),
        (12, 'Truck'),
        (13, 'Other')
    ]

    TRANSMISSION_CHOICES = [
        (1, 'Automatic'),
        (2, 'Manual')
    ]

    FUEL_TYPE_CHOICES = [
        (1, 'Diesel'),
        (2, 'Electric'),
        (3, 'Gas'),
        (4, 'Hybrid'),
        (5, 'Natural Gas'),
        (6, 'Hydrogen'),
        (7, 'Petrol')  # Only for bikes
    ]

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='automobiles')
    automobile_type = models.IntegerField(choices=AUTOMOBILE_TYPE_CHOICES)
    body_type = models.IntegerField(choices=BODY_TYPE_CHOICES, null=True, blank=True)
    transmission = models.IntegerField(choices=TRANSMISSION_CHOICES, null=True, blank=True)
    seating_capacity = models.SmallIntegerField(validators=[MinValueValidator(1), MaxValueValidator(30)], default=1) # compulsory field
    delivery_date = models.DateField(auto_now_add=False)
    fuel_type = models.IntegerField(choices=FUEL_TYPE_CHOICES)
    quantity = models.SmallIntegerField(default=1)
    features = models.ManyToManyField('Feature', through='AutomobileFeature', related_name='automobiles')

    def save(self, *args, **kwargs):
        if self.automobile_type == 1:  # If Bike
            print("Hi i am here in save method in models.py")
            self.body_type = None
            self.transmission = None
            if self.seating_capacity & self.seating_capacity>2:
                print("opps error on seating")
                raise ValidationError("Bikes can only have a seating capacity of 2 or less.")
        print("hi going to super save the  model")
        super().save(*args, **kwargs)

    def get_automobile_type_display(self):
        return dict(self.AUTOMOBILE_TYPE_CHOICES).get(self.automobile_type, 'Unknown')

    def get_fuel_type_display(self):
        return dict(self.FUEL_TYPE_CHOICES).get(self.fuel_type, 'Unknown')

    def get_body_type_display(self):
        return dict(self.BODY_TYPE_CHOICES).get(self.body_type, 'Unknown')

    def get_transmission_display(self):
        return dict(self.TRANSMISSION_CHOICES).get(self.transmission, 'Unknown')
    
        
    def __str__(self):
        return f"{self.user.profile.first_name}'s {self.get_automobile_type_display()}"

    def clean(self):
        if self.automobile_type == 1:  # If Bike
            if self.fuel_type not in (2, 7):  # Electric or Petrol
                raise ValidationError("Bikes can only have Electric or Petrol fuel type.")
            if self.seating_capacity > 2:
                raise ValidationError("Bikes can only have a seating capacity of 2 or less.")
        for feature in self.features.all():
            if feature.category != FeatureCategory.AUTOMOBILE:
                raise ValidationError(f"Feature '{feature.name}' is not applicable for automobiles.")
        super().clean()

class ProductImage(models.Model):
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    product = GenericForeignKey('content_type', 'object_id')
    image_url = models.URLField(max_length=200)
    main_image = models.BooleanField(default=False)

    def __str__(self):
        return self.image_url

class Cart(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='cart')
    total_price = models.DecimalField( max_digits=15, decimal_places=2, default=0.00)
    
class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name='items', on_delete=models.CASCADE)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    product = GenericForeignKey('content_type', 'object_id')
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def clean(self) -> None:
        if self.product.quantity < self.quantity:
            raise ValidationError('Quantity exceeds available stock.')
        
        return super().clean()

    def save(self, *args, **kwargs):
        self.clean()
        with transaction.atomic():
            old_total_price = 0
            if self.pk:  # Check if this is a new instance (i.e., not yet saved to the database)
                old_item = CartItem.objects.get(pk = self.pk)
                old_total_price = old_item.quantity * old_item.price

            new_total_price = self.quantity * self.price
            
            self.cart.total_price = self.cart.total_price - old_total_price + new_total_price
            self.cart.save()
            super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        with transaction.atomic():
            # Calculate the total price of the item being deleted
            item_total_price = self.quantity * self.price

            # Update the cart's total price
            self.cart.total_price -= item_total_price
            self.cart.save()

            super().delete(*args, **kwargs)

class FeatureCategory(models.IntegerChoices):
    YACHT = 1, 'Yacht'
    PENTHOUSE = 2, 'Penthouse'
    AIRCRAFT = 3, 'Aircraft'
    AUTOMOBILE = 4, 'Automobile'

class Feature(models.Model):
    name = models.CharField(max_length=100)
    category = models.IntegerField(
        choices=FeatureCategory.choices,
    )
    def __str__(self):
        return self.name
    
class YachtFeature(models.Model):
    yacht = models.ForeignKey(Yacht, on_delete=models.CASCADE)
    feature = models.ForeignKey(Feature, on_delete=models.CASCADE)

class AutomobileFeature(models.Model):
    automobile = models.ForeignKey(Automobile, on_delete=models.CASCADE)
    feature = models.ForeignKey(Feature, on_delete=models.CASCADE)

class AircraftFeature(models.Model):
    aircraft = models.ForeignKey(Aircraft, on_delete=models.CASCADE)
    feature = models.ForeignKey(Feature, on_delete=models.CASCADE)

class PenthouseFeature(models.Model):
    penthouse = models.ForeignKey(PentHouse, on_delete=models.CASCADE)
    feature = models.ForeignKey(Feature, on_delete=models.CASCADE)


class Purchases(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='purchases')
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    product = GenericForeignKey('content_type', 'object_id')
    quantity = models.PositiveIntegerField(default=1)
    total_price = models.DecimalField(max_digits=15, decimal_places=2)
    purchased_at = models.DateField(auto_now_add=True)
    delivered = models.BooleanField(default=False)  # Indicates whether the item has been delivered
    delivered_on = models.DateField(null=True, blank=True)  # Nullable field for delivery date
    purchase_rating = models.IntegerField(
        null=True,
        blank=True,
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )

    def clean(self):
        # Ensure the quantity purchased does not exceed the available quantity
        if self.product.quantity < self.quantity:
            raise ValidationError('Quantity purchased exceeds available quantity.')
        
    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)
        if self.delivered and self.purchase_rating is not None:
            self.product.update_rating()

class Rating(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    comment = models.TextField(default="")
    purchase = models.ForeignKey('Purchases', on_delete=models.CASCADE, related_name='ratings')
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Rating by {self.user.profile.first_name} for Purchase {self.purchase.id}: {self.rating}"
    
