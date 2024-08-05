from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import *
from django.shortcuts import get_object_or_404
from django.db.models import Q
from .serializers import *
from rest_framework.permissions import AllowAny


class YachtCreateView(generics.GenericAPIView):
    queryset = Yacht.objects.all()
    serializer_class = YachtSerializer

    def get(self, request, *args, **kwargs):
        features = Feature.objects.filter(category=FeatureCategory.YACHT)
        feature_serializer = FeatureSerializer(features, many=True)
        return Response(feature_serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        with transaction.atomic():
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            obj = self.perform_create(serializer)
            obj_serializer = self.get_serializer(obj).data
            other = obj_serializer
            other['yacht_type'] = obj.get_yacht_type_display()
            other['hull_material'] = obj.get_hull_material_display()
            other['fuel_type'] = obj.get_fuel_type_display()
            other['number_of_engines'] = obj.get_number_of_engines_display()
            return Response(other, status=status.HTTP_201_CREATED)

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)

class YachtProductView(APIView):

    def get(self, request):
        yacht_product = Yacht.objects.get(id = request.data['yacht_id'])
        print(yacht_product)
        obj = YachtSerializer(yacht_product).data
        other = obj
        other['yacht_type'] = yacht_product.get_yacht_type_display()
        other['hull_material'] = yacht_product.get_hull_material_display()
        other['fuel_type'] = yacht_product.get_fuel_type_display()
        other['number_of_engines'] = yacht_product.get_number_of_engines_display()
        return Response(other, status=status.HTTP_200_OK)


class PentHouseCreateView(generics.GenericAPIView):
    queryset = PentHouse.objects.all()
    serializer_class = PentHouseSerializer

    def get(self, request, *args, **kwargs):
        features = Feature.objects.filter(category=FeatureCategory.PENTHOUSE)
        feature_serializer = FeatureSerializer(features, many=True)
        return Response(feature_serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        with transaction.atomic():
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            obj = self.perform_create(serializer)
            obj_serializer = self.get_serializer(obj).data
            other = obj_serializer
            other['furnishing'] = obj.get_furnishing_display()
            other['location'] = obj.get_location_display()
            other['facing'] = obj.get_facing_display()
            return Response(other, status=status.HTTP_201_CREATED)

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)

class PentHouseProductView(APIView):

    def get(self, request):
        penthouse_product = PentHouse.objects.get(id = request.data['penthouse_id'])
        print(penthouse_product)
        obj = PentHouseSerializer(penthouse_product).data
        other = obj
        other['furnishing'] = penthouse_product.get_furnishing_display()
        other['location'] = penthouse_product.get_location_display()
        other['facing'] = penthouse_product.get_facing_display()
        return Response(other, status=status.HTTP_200_OK)

class AircraftCreateView(generics.GenericAPIView):
    queryset = Aircraft.objects.all()
    serializer_class = AircraftSerializer

    def get(self, request, *args, **kwargs):
        features = Feature.objects.filter(category=FeatureCategory.AIRCRAFT)
        feature_serializer = FeatureSerializer(features, many=True)
        return Response(feature_serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        with transaction.atomic():
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            obj = self.perform_create(serializer)
            obj_serializer = self.get_serializer(obj).data
            other = obj_serializer
            other['plane_type'] = obj.get_plane_type_display()
            return Response(other, status=status.HTTP_201_CREATED)

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)

    
class AircraftProductView(APIView):

    def get(self, request):
        aircraft_product = Aircraft.objects.get(id = request.data['aircraft_id'])
        print(aircraft_product)
        obj = AircraftSerializer(aircraft_product).data
        other = obj
        other['plane_type'] = obj.get_plane_type_display()
        return Response(other, status=status.HTTP_200_OK)


class AutomobileCreateView(generics.GenericAPIView):
    queryset = Automobile.objects.all()
    serializer_class = AutomobileSerializer

    def get(self, request, *args, **kwargs):
        features = Feature.objects.filter(category=FeatureCategory.AUTOMOBILE)
        feature_serializer = FeatureSerializer(features, many=True)
        return Response(feature_serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        with transaction.atomic():
            print("serializer connecting to request")
            serializer = self.get_serializer(data=request.data)
            print("going to validate the data")
            serializer.is_valid(raise_exception=True)
            obj = self.perform_create(serializer)
            obj_serializer = self.get_serializer(obj).data
            return Response(obj_serializer, status=status.HTTP_201_CREATED)

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)


class AutomobileProductView(APIView):

    def get(self, request):
        automobile_product = Automobile.objects.get(id=request.data['automobile_id'])
        obj = AutomobileSerializer(automobile_product).data
        return Response(obj, status=status.HTTP_200_OK)
    

class YachtsView(APIView):
    permission_classes = [AllowAny]
    YACHT_TYPE_CHOICES = {
        'Sail': 1,
        'Power': 2,
    }

    HULL_MATERIAL_CHOICES = {
        'Aluminum': 1,
        'Composite': 2,
        'Ferro-Cement': 3,
        'Fiberglass': 4,
        'Wood': 5,
        'PVC': 6,
        'Steel': 7,
        'Other': 8,
    }

    FUEL_TYPE_CHOICES = {
        'Diesel': 1,
        'Electric': 2,
        'Petrol': 3,
    }

    def post(self, request):
        queryset = Yacht.objects.all()
        filters = request.data
        print(filters)

        if 'yacht_type' in filters and filters['yacht_type']:
            yacht_type_str = filters['yacht_type']
            if yacht_type_str in self.YACHT_TYPE_CHOICES:
                yacht_type = self.YACHT_TYPE_CHOICES[yacht_type_str]
                queryset = queryset.filter(yacht_type=yacht_type)

        if 'hull_material' in filters and filters['hull_material']:
            hull_material_str = filters['hull_material']
            if hull_material_str in self.HULL_MATERIAL_CHOICES:
                hull_material = self.HULL_MATERIAL_CHOICES[hull_material_str]
                queryset = queryset.filter(hull_material=hull_material)

        if 'fuel_type' in filters and filters['fuel_type']:
            fuel_type_str = filters['fuel_type']
            if fuel_type_str in self.FUEL_TYPE_CHOICES:
                fuel_type = self.FUEL_TYPE_CHOICES[fuel_type_str]
                queryset = queryset.filter(fuel_type=fuel_type)

        if 'number_of_engines' in filters and filters['number_of_engines']:
            number_of_engine = filters['number_of_engines']
            print(number_of_engine)
            if number_of_engine == '4+':
                queryset = queryset.filter(number_of_engines=5)
            elif number_of_engine >= '0' or number_of_engine <='4':
                queryset = queryset.filter(number_of_engines=int(filters['number_of_engines']))
            else:
                raise serializers.ValidationError({'error': "Invalid choice type"})
            
        if 'features' in filters and filters['features']:
            feature_ids = filters.get('features')
            queryset = queryset.filter(features__id__in=feature_ids).distinct()

        if 'length' in filters :
            length_filter = filters.get('length', {})
            min_length = length_filter.get('min')
            max_length = length_filter.get('max')
            if min_length is not None:
                queryset = queryset.filter(length__gte=min_length)
            if max_length is not None:
                queryset = queryset.filter(length__lte=max_length)
        
        if 'beam' in filters:
            beam_filter = filters.get('beam', {})
            min_beam = beam_filter.get('min')
            max_beam = beam_filter.get('max')
            if min_beam is not None:
                queryset = queryset.filter(beam__gte=min_beam)
            if max_beam is not None:
                queryset = queryset.filter(beam__lte=max_beam)
        
        if 'delivery_date' in filters and filters['delivery_date']:
            queryset = queryset.filter(delivery_date__lte=filters['delivery_date'])
        
        if 'price' in filters:
            price_filter = filters.get('price', {})
            min_price = price_filter.get('min')
            max_price = price_filter.get('max')
            if min_price is not None:
                queryset = queryset.filter(price__gte=min_price)
            if max_price is not None:
                queryset = queryset.filter(price__lte=max_price)

        if 'search' in filters and filters['search']:
            queryset = queryset.filter(title__icontains=filters['search'])

        serializer = YachtSummarySerializer(queryset, many=True)

        features = Feature.objects.filter(category=FeatureCategory.YACHT)
        feature_serializer = FeatureSerializer(features, many=True)
        return Response({'objects':serializer.data, 'features':feature_serializer.data}, status=status.HTTP_200_OK)

        
class PentHousesView(APIView):
    permission_classes = [AllowAny]
    FURNISHING_CHOICES = {
        'Semi-furnished': 1,
        'Unfurnished': 2,
        'Furnished': 3
        }

    FACING_CHOICES = {
        'East': 1,
        'North': 2,
        'North - East': 3,
        'North - West': 4,
        'South': 5,
        'South - East': 6,
        'South - West': 7,
        'West': 8
    }

    LOCATION_CHOICES = {
        'Vinewood': 1,
        'South Los Santos': 2,
        'West Vinewood': 3,
        'Paleto Bay': 4,
        'Blaine County': 5,
        'Mission Row': 6,
        'Rockford Hills': 7,
        'Del Perro': 8,
        'Sandy Shores': 9,
        'Los Santos International Airport (LSIA)': 10,
        'Chumash': 11,
        'Davis': 12,
        'East Vinewood': 13,
        'Grapeseed': 14,
        'Other': 15
    }


    def post(self, request):
        queryset = PentHouse.objects.all()
        filters = request.data
        print(filters)

        if 'facing' in filters and filters['facing']:
            facing_type = filters['facing']
            if facing_type in self.FACING_CHOICES:
                facing = self.FACING_CHOICES[facing_type]
                queryset = queryset.filter(facing=facing)

        if 'location' in filters and filters['location']:
            location_str = filters['location']
            if location_str in self.LOCATION_CHOICES:
                location = self.LOCATION_CHOICES[location_str]
                queryset = queryset.filter(location=location)

        if 'furnishing' in filters and filters['furnishing']:
            furnishing_str = filters['furnishing']
            if furnishing_str in self.FURNISHING_CHOICES:
                furnishing = self.FURNISHING_CHOICES[furnishing_str]
                queryset = queryset.filter(furnishing=furnishing)

        if 'covered_area' in filters :
            covered_area = filters.get('covered_area', {})
            min_area = covered_area.get('min')
            max_area = covered_area.get('max')
            if min_area is not None:
                queryset = queryset.filter(covered_area__gte=min_area)
            if max_area is not None:
                queryset = queryset.filter(covered_area__lte=max_area)
        
        if 'bhk' in filters:
            bhk = filters.get('bhk', None)
            if bhk is not None:
                try:
                    if bhk=='5+':
                        queryset = queryset.filter(bhk__gte=5)
                    else:
                        queryset = queryset.filter(bhk=int(bhk))
                except Exception as e:
                    return Response({'error' : e }, status = status.HTTP_400_BAD_REQUEST)
                    
        if 'bathrooms' in filters:
            bathrooms = filters.get('bathrooms', None)
            if bathrooms is not None:
                try:
                    if bathrooms=='5+':
                        queryset = queryset.filter(bathrooms__gte=5)
                    else:
                        queryset = queryset.filter(bathrooms=int(bathrooms))
                except Exception as e:
                    return Response({'error' : e }, status = status.HTTP_400_BAD_REQUEST)

        if 'features' in filters and filters['features']:
            feature_ids = filters.get('features')
            queryset = queryset.filter(features__id__in=feature_ids).distinct()

        if 'price' in filters:
            price_filter = filters.get('price', {})
            min_price = price_filter.get('min')
            max_price = price_filter.get('max')
            if min_price is not None:
                queryset = queryset.filter(price__gte=min_price)
            if max_price is not None:
                queryset = queryset.filter(price__lte=max_price)

        if 'search' in filters and filters['search']:
            queryset = queryset.filter(title__icontains=filters['search'])

        serializer = PentHousesSummarySerializer(queryset, many=True)

        features = Feature.objects.filter(category=FeatureCategory.PENTHOUSE)
        feature_serializer = FeatureSerializer(features, many=True)
        return Response({'objects':serializer.data, 'features':feature_serializer.data}, status=status.HTTP_200_OK)

        
class AircraftsView(APIView):
    
    permission_classes = [AllowAny]
    
    PLANE_TYPE_CHOICES = {
        'Helicopter': 1,
        'Heavy Jet': 2,
        'Light Jet': 3,
        'Midsize Jet': 4,
        'Large Cabin': 5,
        'Piston Single': 6,
        'Piston Twin': 7,
        'Super Heavy Jet': 8,
        'Super Light Jet': 9,
        'Super Midsize Jet': 10,
        'Turbo Prop': 11,
        'Other': 12
    }



    def post(self, request):
        queryset = Aircraft.objects.all()
        filters = request.data
        print(filters)

        if 'plane' in filters and filters['plane']:
            plane_type = filters['plane']
            if plane_type in self.PLANE_TYPE_CHOICES:
                plane = self.PLANE_TYPE_CHOICES[plane_type]
                queryset = queryset.filter(plane=plane)

        if 'passenger_capacity' in filters :
            passenger_capacity = filters.get('passenger_capacity', {})
            min_val = passenger_capacity.get('min')
            max_val = passenger_capacity.get('max')
            if min_val is not None:
                queryset = queryset.filter(passenger_capacity__gte=min_val)
            if max_val is not None:
                queryset = queryset.filter(passenger_capacity__lte=max_val)
                    
        if 'bathrooms' in filters:
            bathrooms = filters.get('bathrooms', None)
            if bathrooms is not None:
                try:
                    if bathrooms=='5+':
                        queryset = queryset.filter(bathrooms__gte=5)
                    else:
                        queryset = queryset.filter(bathrooms=int(bathrooms))
                except Exception as e:
                    return Response({'error' : e }, status = status.HTTP_400_BAD_REQUEST)

        if 'features' in filters and filters['features']:
            feature_ids = filters.get('features')
            queryset = queryset.filter(features__id__in=feature_ids).distinct()

        if 'price' in filters:
            price_filter = filters.get('price', {})
            min_price = price_filter.get('min')
            max_price = price_filter.get('max')
            if min_price is not None:
                queryset = queryset.filter(price__gte=min_price)
            if max_price is not None:
                queryset = queryset.filter(price__lte=max_price)

        if 'delivery_date' in filters and filters['delivery_date']:
            queryset = queryset.filter(delivery_date__lte=filters['delivery_date'])

        if 'search' in filters and filters['search']:
            queryset = queryset.filter(title__icontains=filters['search'])

        serializer = AircraftsSummarySerializer(queryset, many=True)

        features = Feature.objects.filter(category=FeatureCategory.AIRCRAFT)
        feature_serializer = FeatureSerializer(features, many=True)
        return Response({'objects':serializer.data, 'features':feature_serializer.data}, status=status.HTTP_200_OK)
        
       
        

class DeleteYachtView(APIView):

    def post(self, request, *args, **kwargs):
        ids = request.data['ids'] 
        for yacht_id in ids:
            yacht = get_object_or_404(Yacht, id=yacht_id)
            
            # Delete related features
            YachtFeature.objects.filter(yacht=yacht).delete()

            # Delete related images
            ProductImage.objects.filter(
                Q(content_type=ContentType.objects.get_for_model(Yacht)) & 
                Q(object_id=yacht.id)
            ).delete()

            # Delete related ratings
            related_purchases = Purchases.objects.filter(
                Q(content_type=ContentType.objects.get_for_model(Yacht)) & 
                Q(object_id=yacht.id)
            )
            Rating.objects.filter(purchase__in=related_purchases).delete()
            
            # Delete related purchases
            related_purchases.delete()

            # Finally, delete the yacht
            yacht.delete()

        return Response({"detail": "Yacht and related objects deleted successfully."}, status=status.HTTP_200_OK)


class SaveFeatureView(APIView):
    def post(self, request):
        with transaction.atomic():
            # name and category should be in list format
            names = request.data['name']
            category = request.data.get('category')
            obj = {}
            for name in names:
                feature = Feature.objects.create(name=name, category=category)
                obj.update(FeatureSerializer(feature).data)
            
            # Serialize the created Feature instance
            return Response(obj, status=status.HTTP_201_CREATED)

    def get(self, request):
        # category should come in list format with integer values of ID
        category = request.data['category']
        feature = Feature.objects.filter(category = category)
        obj = FeatureSerializer(feature, many = True).data
        return Response(obj,status=status.HTTP_200_OK)