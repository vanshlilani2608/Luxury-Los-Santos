# products/serializers.py

from urllib.parse import quote
from rest_framework import serializers
from .models import *
from users.models import CustomUser
import WMC.utils as util


class YachtSerializer(serializers.ModelSerializer):
    images = serializers.ListField(
        child=serializers.ImageField(),
        write_only=True
    )
    main_image = serializers.ImageField(write_only=True)
    yacht_type = serializers.CharField()
    hull_material = serializers.CharField()
    fuel_type = serializers.CharField()
    number_of_engines= serializers.CharField()
    features = serializers.ListField(child=serializers.IntegerField(), write_only=True)

    class Meta:
        model = Yacht
        fields = ['id', 'title', 'description', 'price', 'yacht_type', 'hull_material', 'main_image', 'images', 'fuel_type', 'length', 'beam', 'number_of_engines', 'features', 'quantity', 'delivery_date']
    

    def get_features(self, obj):
        return [feature.name for feature in obj.features.all()]
    
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['images'] = list(instance.images.filter(main_image=False).values_list('image_url', flat=True))
        ret['main_image'] = instance.images.filter(main_image=True).first().image_url if instance.images.filter(main_image=True).exists() else None
        ret['features'] = [feature.name for feature in instance.features.all()]
        return ret

    def create(self, validated_data):
        with transaction.atomic():
            images = validated_data.pop('images')
            main_image = validated_data.pop('main_image')
            user = self.context['request'].user
            feature_ids = validated_data.pop('features', [])
            
            yacht = Yacht.objects.create( **validated_data)
            
            features = Feature.objects.filter(id__in=feature_ids)
            yacht.features.set(features)
            
            util.store_product_images(images, user, yacht)
            util.store_product_main_image(main_image, user, yacht)

            return yacht
    
    def validate(self, data):
        
        yacht_type = data.get('yacht_type')
        hull_material = data.get('hull_material')
        fuel_type = data.get('fuel_type')
        number_of_engines = data.get('number_of_engines')

        
        if yacht_type and yacht_type not in dict(Yacht.YACHT_TYPE_CHOICES).values():
            raise serializers.ValidationError({
                'yacht_type': f'"{yacht_type}" is not a valid choice.'
            })
            
        if hull_material and hull_material not in dict(Yacht.HULL_MATERIAL_CHOICES).values():
            raise serializers.ValidationError({
                'hull_material': f'"{hull_material}" is not a valid choice.'
            })
            
        if fuel_type and fuel_type not in dict(Yacht.FUEL_TYPE_CHOICES).values():
            raise serializers.ValidationError({
                'fuel_type': f'"{fuel_type}" is not a valid choice.'
            })
            
        if number_of_engines and number_of_engines not in dict(Yacht.NUMBER_OF_ENGINES).values():
            raise serializers.ValidationError({
                'number_of_engines': f'"{number_of_engines}" is not a valid choice.'
            })

        if yacht_type:
            data['yacht_type'] = next(
                key for key, value in dict(Yacht.YACHT_TYPE_CHOICES).items()
                if value == yacht_type
            )
        if hull_material:
            data['hull_material'] = next(
                key for key, value in dict(Yacht.HULL_MATERIAL_CHOICES).items()
                if value == hull_material
            )
        if fuel_type:
            data['fuel_type'] = next(
                key for key, value in dict(Yacht.FUEL_TYPE_CHOICES).items()
                if value == fuel_type
            )
        if number_of_engines:
            data['number_of_engines'] = next(
                key for key, value in dict(Yacht.NUMBER_OF_ENGINES).items()
                if value == number_of_engines
            )

        return data
    
class YachtSummarySerializer(YachtSerializer):

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret.pop('images', None)
        return ret
        
    class Meta(YachtSerializer.Meta):
        fields = ['id', 'title', 'price', 'main_image']

class PentHouseSerializer(serializers.ModelSerializer):
    images = serializers.ListField(
        child=serializers.ImageField(),
        write_only=True
    )
    main_image = serializers.ImageField(write_only=True)
    location = serializers.CharField()
    furnishing = serializers.CharField()
    facing = serializers.CharField()
    features = serializers.ListField(child=serializers.IntegerField(), write_only=True)

    class Meta:
        model = PentHouse
        fields = ['id', 'title', 'description', 'price', 'main_image', 'images', 'features', 'house_address', 'bhk', 'covered_area', 'bathrooms', 'furnishing', 'facing', 'location']
    

    def get_features(self, obj):
        return [feature.name for feature in obj.features.all()]
    
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['images'] = list(instance.images.filter(main_image=False).values_list('image_url', flat=True))
        ret['main_image'] = instance.images.filter(main_image=True).first().image_url if instance.images.filter(main_image=True).exists() else None
        ret['features'] = [feature.name for feature in instance.features.all()]
        return ret

    def create(self, validated_data):
        with transaction.atomic():
            images = validated_data.pop('images')
            main_image = validated_data.pop('main_image')
            user = self.context['request'].user
            feature_ids = validated_data.pop('features', [])
            
            
            penthouse = PentHouse.objects.create( **validated_data)
            
            features = Feature.objects.filter(id__in=feature_ids)
            penthouse.features.set(features)
            
            util.store_product_images(images, user, penthouse)
            util.store_product_main_image(main_image, user, penthouse)

            return penthouse
    
    def validate(self, data):
        
        furnishing = data.get('furnishing')
        location = data.get('location')
        facing = data.get('facing')

        
        if furnishing and furnishing not in dict(PentHouse.FURNISHING_CHOICES).values():
            raise serializers.ValidationError({
                'furnishing': f'"{furnishing}" is not a valid choice.'
            })
            
        if location and location not in dict(PentHouse.LOCATION_CHOICES).values():
            raise serializers.ValidationError({
                'location': f'"{location}" is not a valid choice.'
            })
            
        if facing and facing not in dict(PentHouse.FACING_CHOICES).values():
            raise serializers.ValidationError({
                'facing': f'"{facing}" is not a valid choice.'
            })
            

        if furnishing:
            data['furnishing'] = next(
                key for key, value in dict(PentHouse.FURNISHING_CHOICES).items()
                if value == furnishing
            )
        if location:
            data['location'] = next(
                key for key, value in dict(PentHouse.LOCATION_CHOICES).items()
                if value == location
            )
        if facing:
            data['facing'] = next(
                key for key, value in dict(PentHouse.FACING_CHOICES).items()
                if value == facing
            )

        return data


class PentHousesSummarySerializer(PentHouseSerializer):

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret.pop('images', None)
        ret['location'] = instance.get_location_display()
        return ret
        
    class Meta(PentHouseSerializer.Meta):
        fields = ['id', 'title', 'price', 'main_image', 'location']

class AircraftSerializer(serializers.ModelSerializer):
    images = serializers.ListField(
        child=serializers.ImageField(),
        write_only=True
    )
    main_image = serializers.ImageField(write_only=True)
    plane_type = serializers.CharField()
    features = serializers.ListField(child=serializers.IntegerField(), write_only=True)

    class Meta:
        model = Aircraft
        fields = ['id', 'title', 'description', 'price', 'plane_type', 'main_image', 'images', 'features', 'quantity', 'delivery_date', 'passenger_capacity']


    def get_features(self, obj):
        return [feature.name for feature in obj.features.all()]
    
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['images'] = list(instance.images.filter(main_image=False).values_list('image_url', flat=True))
        ret['main_image'] = instance.images.filter(main_image=True).first().image_url if instance.images.filter(main_image=True).exists() else None
        ret['features'] = [feature.name for feature in instance.features.all()]
        return ret

    def create(self, validated_data):
        with transaction.atomic():
            images = validated_data.pop('images')
            main_image = validated_data.pop('main_image')
            user = self.context['request'].user
            feature_ids = validated_data.pop('features', [])
            
            aircraft = Aircraft.objects.create( **validated_data)
            
            features = Feature.objects.filter(id__in=feature_ids)
            aircraft.features.set(features)
            
            util.store_product_images(images, user, aircraft)
            util.store_product_main_image(main_image, user, aircraft)

            return aircraft
    
    def validate(self, data):
        
        plane_type = data.get('plane_type')
            
        if plane_type and plane_type not in dict(Aircraft.PLANE_TYPE_CHOICES).values():
            raise serializers.ValidationError({
                'plane_type': f'"{plane_type}" is not a valid choice.'
            })
            
        if plane_type:
            data['plane_type'] = next(
                key for key, value in dict(Aircraft.PLANE_TYPE_CHOICES).items()
                if value == plane_type
            )
        return data

        
class AircraftsSummarySerializer(AircraftSerializer):

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret.pop('images', None)
        return ret
        
    class Meta(AircraftSerializer.Meta):
        fields = ['id', 'title', 'price', 'main_image']


class AutomobileSerializer(serializers.ModelSerializer):
    images = serializers.ListField(
        child=serializers.ImageField(),
        write_only=True
    )
    main_image = serializers.ImageField(write_only=True)
    automobile_type = serializers.CharField()
    body_type = serializers.CharField(required = False)
    transmission = serializers.CharField(required = False)
    fuel_type = serializers.CharField()
    features = serializers.ListField(child=serializers.IntegerField(), write_only=True)

    class Meta:
        model = Automobile
        fields = ['id', 'title', 'description', 'price', 'automobile_type', 'body_type', 'transmission', 'seating_capacity', 'delivery_date', 'fuel_type', 'main_image', 'images', 'features', 'quantity']


    def get_features(self, obj):
        return [feature.name for feature in obj.features.all()]
    
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['images'] = list(instance.images.filter(main_image=False).values_list('image_url', flat=True))
        ret['main_image'] = instance.images.filter(main_image=True).first().image_url if instance.images.filter(main_image=True).exists() else None
        ret['features'] = [feature.name for feature in instance.features.all()]
        ret['automobile_type'] = instance.get_automobile_type_display()
        ret['fuel_type'] = instance.get_fuel_type_display()
        ret['body_type'] = instance.get_body_type_display()
        ret['transmission'] = instance.get_transmission_display()

        if instance.automobile_type == 1:
            ret.pop('body_type', None)
            ret.pop('transmission', None)
        return ret

    def create(self, validated_data):
        try:
                
            images = validated_data.pop('images')
            main_image = validated_data.pop('main_image')
            user = self.context['request'].user
            feature_ids = validated_data.pop('features', [])
            
            if validated_data['automobile_type'] == 1:
                validated_data['body_type'] = None
                validated_data['transmission'] = None
            
            # Save the automobile instance first
            automobile = Automobile.objects.create(**validated_data)
            # for field in Automobile._meta.get_fields():
            #     value = getattr(automobile, field.name, 'Not Available')
            #     print(f"{field.name}: {value}")
            
            # Now you can set the many-to-many relationship
            features = Feature.objects.filter(id__in=feature_ids)
            automobile.features.set(features)
            
            # Call the utility functions
            util.store_product_images(images, user, automobile)
            util.store_product_main_image(main_image, user, automobile)

            return automobile
        except ValidationError as e:
            raise serializers.ValidationError({'error':e})

    
    def validate(self, data):
        print("Hi i m in validate method")
        automobile_type = data.get('automobile_type')
        body_type = data.get('body_type')
        transmission = data.get('transmission')
        fuel_type = data.get('fuel_type')

        # Mapping choices to dictionaries for quick lookup
        automobile_type_dict = dict(Automobile.AUTOMOBILE_TYPE_CHOICES)
        body_type_dict = dict(Automobile.BODY_TYPE_CHOICES)
        transmission_dict = dict(Automobile.TRANSMISSION_CHOICES)
        fuel_type_dict = dict(Automobile.FUEL_TYPE_CHOICES)

        # Validate automobile type
        if automobile_type not in automobile_type_dict.values():
            raise serializers.ValidationError({'automobile_type': f'"{automobile_type}" is not a valid choice.'})

        # Convert automobile type to integer choice
        data['automobile_type'] = next(key for key, value in automobile_type_dict.items() if value == automobile_type)

        if automobile_type == 'Bike':
            # Convert to integer choice for bike type
            data['automobile_type'] = 1

            # Validate fuel type for bikes
            if fuel_type not in [fuel_type_dict[2], fuel_type_dict[7]]:
                raise serializers.ValidationError({'fuel_type': 'Bikes can only have Electric or Petrol fuel type.'})

            # Ensure body type and transmission are not provided for bikes
            if body_type is not None:
                raise serializers.ValidationError({'body_type': 'Bikes do not have a body type.'})
            if transmission is not None:
                raise serializers.ValidationError({'transmission': 'Bikes do not have a transmission type.'})

            # Remove body type and transmission for bikes
            data.pop('body_type', None)
            data.pop('transmission', None)
        else:
            # Validate and convert body type
            if body_type is not None:
                if body_type not in body_type_dict.values():
                    raise serializers.ValidationError({'body_type': f'"{body_type}" is not a valid choice.'})
                data['body_type'] = next(key for key, value in body_type_dict.items() if value == body_type)
            else:
                raise serializers.ValidationError({'body_type':'Body Type not given.'})
            # Validate and convert transmission
            if transmission is not None:
                if transmission not in transmission_dict.values():
                    raise serializers.ValidationError({'transmission': f'"{transmission}" is not a valid choice.'})
                data['transmission'] = next(key for key, value in transmission_dict.items() if value == transmission)
            else:
                raise serializers.ValidationError({'transmission':'transmission type not given.'})
        # Validate and convert fuel type
        if fuel_type not in fuel_type_dict.values():
            raise serializers.ValidationError({'fuel_type': f'"{fuel_type}" is not a valid choice.'})
        data['fuel_type'] = next(key for key, value in fuel_type_dict.items() if value == fuel_type)

        return data

        

class FeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feature
        fields = ['id', 'name']

