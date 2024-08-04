from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('signUp/', SignUpView.as_view(), name="signup"),
    path('logIn/', LogInView.as_view(), name='login'),
    path('editProfile/', EditProfileView.as_view(), name = "editprofile"),
    path('home/', HomeView.as_view(), name='home'),
    path('storeImage/', ImageStoreView.as_view(), name='imagestore'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('profile/info/', ProfileInfoView.as_view(), name='profile_info'),
    path('profile/bank/', BankDetail.as_view(), name='profile_bank'),
    # path('profile/purchases/'),
    # path('profile/sales/'),
]