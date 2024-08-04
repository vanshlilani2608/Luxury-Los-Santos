from urllib.parse import quote
from supabase import create_client
from products.models import ProductImage
from django.contrib.contenttypes.models import ContentType


SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0aG5jaGt0emN1a21iYWhhb2dxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEwNjg1MjEsImV4cCI6MjAzNjY0NDUyMX0.PEuzZa2I4sbfzRdd1xBIl7HC-gVZ3jBknCd1P6h9rBw"
SUPABASE_URL = "https://dthnchktzcukmbahaogq.supabase.co" 

bucket_name = "Profile Images"
client = create_client(SUPABASE_URL, SUPABASE_KEY)

def store_product_images(images, user, product):
        product_name = product.__class__.__name__.lower()
        print(product_name)
        for image in images:
            file_name = f"{product.id}_{image.name}"
            response = client.storage.from_(bucket_name).upload(f"{product_name}s_images/{product.id}/{file_name}", image.read())
            if response.status_code == 200:
                encoded_file_name = quote(file_name)
                url = f"{SUPABASE_URL}/storage/v1/object/public/{quote(bucket_name)}/{product_name}s_images/{product.id}/{encoded_file_name}"
                ProductImage.objects.create(object_id = product.id, content_type = ContentType.objects.get_for_model(product), image_url = url, main_image = False)

def store_product_main_image(image, user, product):
        file_name = f"{product.id}_{image.name}"
        product_name = product.__class__.__name__.lower()
        print(product_name)
        response = client.storage.from_(bucket_name).upload(f"{product_name}s_images/{product.id}/{file_name}", image.read())
        if response.status_code == 200:
            url = f"{SUPABASE_URL}/storage/v1/object/public/{quote(bucket_name)}/{product_name}s_images/{product.id}/{quote(file_name)}"
            ProductImage.objects.create(object_id = product.id, content_type = ContentType.objects.get_for_model(product), image_url=url, main_image=True)
            
    