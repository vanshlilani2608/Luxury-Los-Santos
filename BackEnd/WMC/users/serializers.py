from rest_framework import serializers
from .models import CustomUser, Profile
from django.contrib.auth import authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

    
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
        # fields = ['email', 'password', 'first_name', 'last_name', 'phone_number', 'age', 'gender', 'address']
        fields = ['email', 'password', 'first_name', 'last_name', 'phone_number', 'age', 'gender', 'address']
    def create(self, validated_data):

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
        return attrs
    
class EditProfileSerialzer(serializers.Serializer):

    class Meta:
        model = Profile
        fields = ['first_name', 'last_name', 'photo_link', 'phone_number', 'age', 'gender', 'address']

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['id'] = user.id
        return token
    
