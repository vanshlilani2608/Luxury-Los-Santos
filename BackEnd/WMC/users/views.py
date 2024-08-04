from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from .models import CustomUser, Profile
from .serializers import *
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer


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
        return Response({'error':"Invalid inputs given or few inputs were missing"}, status = status.HTTP_400_BAD_REQUEST)
    
    
    

class LogInView(APIView):
    permission_classes = [AllowAny] 
    def get(self, request):
        print("Hi i'am in get ")
        return render(request, 'login.html')
                    
    def post(self, request):
        serializer = LogInSerializer(data=request.data)
        print(request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            print("hii")
            if user:
                print(user.email)
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


class HomeView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        if request.user.is_anonymous:
            user = None
        else:
            user = CustomUserSerializer(request.user).data
        return Response({'user':user}, status=status.HTTP_200_OK)
    
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

class ProfileView(APIView):     
    def get(self, request):
        serializer = ProfileSerialzer(request.user.profile).data
        user_data = CustomUserSerializer(request.user).data
        serializer.update(user_data)
        return Response({'user':serializer}, status = status.HTTP_200_OK)

class ProfileInfoView(ProfileView):
    def get(self, request):
        detail_data = ProfileInfoSerializer(request.user.profile).data
        response = super().get(request)
        response.data = detail_data
        return response
    
class BankDetail(APIView):
    def get(self, request):
        data = BankDetailSerializer(request.user.profile).data
        return Response(data, status=status.HTTP_200_OK)
    
    def post(self, request):
        profile = request.user.profile
        amount = request.data.get('amount', 0)
        withdraw = request.data.get('withdraw', False)
        add = request.data.get('add', False)
        
        if not (withdraw or add):
            return Response({'error': 'Either withdraw or add must be true.'}, status=status.HTTP_400_BAD_REQUEST)
        
        if withdraw and add:
            return Response({'error': 'Cannot both withdraw and add money at the same time.'}, status=status.HTTP_400_BAD_REQUEST)
        
        if amount <= 0:
            return Response({'error': 'Amount must be greater than zero.'}, status=status.HTTP_400_BAD_REQUEST)
        
        if withdraw:
            if profile.bank_balance < amount:
                return Response({'error': 'Insufficient balance.'}, status=status.HTTP_400_BAD_REQUEST)
            profile.bank_balance -= amount
        
        if add:
            profile.bank_balance += amount
        
        profile.save()
        return Response({'bank_balance': profile.bank_balance}, status=status.HTTP_200_OK)
        