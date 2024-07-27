from django.shortcuts import render
from django.views import View
# Create your views here.

class TempPhotoView(View):
    def get(self, request):
        return render(request, 'login.html')  # Render your login template

    def post(self, request):
        # Get data from the request
        phone_number = request.POST.get('phone_number')
        gender = request.POST.get('gender')
        address = request.POST.get('address')

        # Print the data (or handle it as needed)
        print(f"Phone Number: {phone_number}")
        print(f"Gender: {gender}")
        print(f"Address: {address}")

        json_data = {

        }

        return render(request, 'login.html')  # Redirect or render a different template after processing
