import requests
from django.http import JsonResponse
from django.utils.deprecation import MiddlewareMixin
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework.reverse import reverse
import json

class RefreshTokenMiddleware(MiddlewareMixin):
    def process_request(self, request):
        auth = JWTAuthentication()
        header = auth.get_header(request)
        
        if header is None:
            return
        
        raw_token = auth.get_raw_token(header)
        
        if raw_token is None:
            return
        validated_token = None
        try:
            validated_token = auth.get_validated_token(raw_token)
        except (TokenError, InvalidToken):
            validated_token = None
        
        if validated_token is None:
            refresh_token = request.COOKIES.get('refresh')
            
            if not refresh_token:
                refresh_token = request.headers.get('X-Refresh-Token')
            
            if not refresh_token and request.method == 'POST' and request.content_type == 'application/json':
                try:
                    body_data = json.loads(request.body)
                    refresh_token = body_data.get('refresh')
                except json.JSONDecodeError:
                    pass
            
            if refresh_token:
                try:
                    refresh_url = request.build_absolute_uri(reverse('token_refresh'))
                    response = requests.post(refresh_url, data={'refresh': refresh_token})
                    if response.status_code == 200:
                        new_access_token = response.json().get('access')
                        if new_access_token:
                            request.new_access_token = new_access_token
                            request.META['HTTP_AUTHORIZATION'] = f'Bearer {new_access_token}'
                    else:
                        return JsonResponse({'error': 'Unable to refresh token'}, status=401)
                except requests.RequestException as e:
                    return JsonResponse({'error': str(e)}, status=500)
        
        return

    def process_response(self, request, response):
        if hasattr(request, 'new_access_token'):
            response['X-New-Access-Token'] = request.new_access_token
        return response

# {
#     "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMjE0NTg1MSwiaWF0IjoxNzIyMDU5NDUxLCJqdGkiOiI3YTAwYjhiMDYwYzQ0NzIxODU4OWUyMjYxODc1YTBiMyIsInVzZXJfaWQiOjF9.ILOrkGJL4NGTB8nsXaDaErsPoBpP2eL91zvPJokgBhw",
#     "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIyMDYzMDUxLCJpYXQiOjE3MjIwNTk0NTEsImp0aSI6IjRhNzBjYzAwNjY5MDRkM2I4MzY3YWNlYzg5ZTE5Mzk1IiwidXNlcl9pZCI6MX0.JdR28Lfp-8-1cEJvFTaq4K1RLKyO2fyzSgChJED1Q9I",
#     "user": {
#         "id": 1,
#         "email": "vanshlilani2608@gmail.com"
#     }
# }

