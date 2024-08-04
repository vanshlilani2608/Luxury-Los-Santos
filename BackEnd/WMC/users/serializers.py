from urllib.parse import quote, unquote
from rest_framework import serializers
from .models import CustomUser, Profile
from django.contrib.auth import authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from supabase import create_client

SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0aG5jaGt0emN1a21iYWhhb2dxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEwNjg1MjEsImV4cCI6MjAzNjY0NDUyMX0.PEuzZa2I4sbfzRdd1xBIl7HC-gVZ3jBknCd1P6h9rBw"
SUPABASE_URL = "https://dthnchktzcukmbahaogq.supabase.co" 

client = create_client(SUPABASE_URL, SUPABASE_KEY)

class SignUpSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    first_name = serializers.CharField(max_length=50)
    last_name = serializers.CharField(max_length=50)
    phone_number = serializers.CharField(max_length=15, required=False)
    age = serializers.IntegerField(required=False)
    gender = serializers.ChoiceField(choices=[('male', 'Male'), ('female', 'Female'), ('other', 'Other')], required=False)
    address = serializers.CharField(required=False, allow_blank=True)
    
    class Meta:
        model= CustomUser
        fields = ['email', 'password', 'first_name', 'last_name', 'phone_number', 'age', 'gender', 'address']

    def create(self, validated_data):
        try:
            user = CustomUser.objects.create_user(
                email = validated_data['email'],
                password = validated_data['password']
            )   
            
            Profile.objects.create(
                user=user,
                first_name=validated_data['first_name'],
                last_name=validated_data['last_name'],
                phone_number=validated_data['phone_number'],
                age=validated_data['age'],
                gender=validated_data['gender'],
                address=validated_data['address']
            )

            return user
        except Exception as e:
            raise serializers.ValidationError({'detail':str(e)})
            
    def validate(self, attrs):
        if CustomUser.objects.filter(email=attrs['email']).exists():
            return serializers.ValidationError("Email already exists. Use different email")
        return super().validate(attrs)
    
class LogInSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only = True)

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        user = authenticate(email= email, password = password)
        if user is None:
            raise serializers.ValidationError("Invalid email or password")

        refresh = RefreshToken.for_user(user)
        access = refresh.access_token

        return {
            'is_valid': True,
            'user': user,
            'refresh': str(refresh),
            'access': str(access),
        }
    
class EditProfileSerialzer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = ['first_name', 'last_name', 'phone_number', 'age', 'gender', 'address']

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['id'] = user.id
        return token
    
class ImageStoreSerializer(serializers.Serializer):
    photo = serializers.ImageField()
    def save(self, **kwargs):
        user = self.context['request'].user
        photo = self.validated_data['photo']

        if not photo:
            raise serializers.ValidationError({"photo": "No image provided"})

        return self.store(photo, user)

    def store(self, photo, user):
        print("storing started")
        file_name = f"{user.id}_{photo.name}"
        bucket_name = "Profile Images"

        existing_image_url = user.profile.photo_link
        if existing_image_url:
            print("removing images")
            existing_file_name = unquote(existing_image_url.split('/')[-1])
            print(existing_file_name)
            client.storage.from_(bucket_name).remove([f"profile_images/{existing_file_name}"])
            print(" images removed")
        
        response = client.storage.from_(bucket_name).upload(f"profile_images/{file_name}", photo.read())
        encoded_file_name = quote(file_name)

        url = f"{SUPABASE_URL}/storage/v1/object/public/{quote(bucket_name)}/profile_images/{encoded_file_name}"
        print(response, "photo stored")
        user.profile.photo_link = url
        user.profile.save()
        print("photo saved")
        return url