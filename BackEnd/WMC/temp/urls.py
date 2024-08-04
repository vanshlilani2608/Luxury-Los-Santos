from django.urls import path
from users.views import *

urlpatterns = [
    # path('', EmailCheckView.as_view(), name="signup1"),
    path('signUp/', SignUpView.as_view(), name="signup"),
    path('logIn/', LogInView.as_view(), name='login'),
    path('editProfile/', EditProfileView.as_view(), name = "editprofile"),
    path('home/', HomeView.as_view(), name='home'),
]

# superuser email - vanshlilani2608@gmail.com
# password - 1234