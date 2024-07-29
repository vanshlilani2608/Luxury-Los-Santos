from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from .models import CustomUser, Profile
from .serializers import *
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer


class EmailCheckView(APIView):
    permission_classes = [AllowAny]
    def post(self,request):
        email = request.data.get('email')
        if email:
            if CustomUser.objects.filter(email=email).exists():
                return Response({'can_use':False},status=status.HTTP_200_OK)
            else:
                return Response({'can_use':True},status=status.HTTP_200_OK)
        return Response({'error':"Email not provided"}, status = status.HTTP_400_BAD_REQUEST)
    
class SignUpView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        return render(request, 'login.html')  # Render your login template

    def post(self, request):
        serializer = SignUpSerializer(data=request.data)
        if serializer.is_valid():
            try:
                user = serializer.save()
                return Response(status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'error':str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
    
    

class LogInView(APIView):
    permission_classes = [AllowAny] 
    def get(self, request):
        return render(request, 'login.html')
                    
    def post(self, request):
        serializer = LogInSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            if user:
                refresh = RefreshToken.for_user(user)
                response = Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'user': {
                        'id': user.id,
                        'email': user.email,
                    }
                }, status=status.HTTP_200_OK)
                return response

        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

class EditProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return render(request, 'editprofile.html')
    

    def post(self, request):
        user = request.user
        try:
            profile = Profile.objects.get(user=user)
        except Profile.DoesNotExist:
            return Response({"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = EditProfileSerialzer(profile, data=request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Profile updated successfully"}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


def store(self, photo):
    from urllib.parse import quote
    SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmF`zZSIsInJlZiI6ImR0aG5jaGt0emN1a21iYWhhb2dxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEwNjg1MjEsImV4cCI6MjAzNjY0NDUyMX0.PEuzZa2I4sbfzRdd1xBIl7HC-gVZ3jBknCd1P6h9rBw"
    SUPABASE_URL = "https://dthnchktzcukmbahaogq.supabase.co" 

    from supabase import create_client

    client = create_client(SUPABASE_URL, SUPABASE_KEY)
    file_name = f"profile_images/{photo.name}"
    response = client.storage.from_("Profile Images").upload(file_name, photo.read())

    encoded_file_name = quote(photo.name)

    url = f"{SUPABASE_URL}/storage/v1/object/public/Profile%20Images/profile_images/{encoded_file_name}"
    print(response, "photo stored")
    return url

class HomeView(APIView):
    # permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        print(user)
        # print(user.profile.first_name)
        attr = {
            'user' : user
        }
        return render(request, 'home.html', attr)
    
class ImageStoreView(APIView):

    def post(self, request):
        serializer = ImageStoreSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            try:
                url = serializer.save()
                return Response({'url':url},status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'error':str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjI0MzA4NSwiaWF0IjoxNzIyMTU2Njg1LCJqdGkiOiIyOTFhYzUyNTc3MGM0MmFhOGRkNmU5OTM5NDBjNDFmNCIsInVzZXJfaWQiOjF9.TS_MUEIqrDoRePzbbvNSKobIWRRULWPXws_LZ3pchrM",
#     "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIyMTYwMjg1LCJpYXQiOjE3MjIxNTY2ODUsImp0aSI6ImE5MzY3MmFmYjdjZDQ4MjJhMTRhYjY2YzBjZTk4N2MwIiwidXNlcl9pZCI6MX0.7ZWcWTa8Kvo-UAgeWPR9vvsCngSL9gBgtz9rhak2mgI",
#     "user": {
#         "id": 1,
#         "email": "vanshlilani2608@gmail.com"
#     }