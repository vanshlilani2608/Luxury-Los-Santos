from django.urls import path
from .views import *

urlpatterns = [
    path('deleteYacht/', DeleteYachtView.as_view(), name='deleteyacht'),
    path('saveFeature/', SaveFeatureView.as_view(), name = 'savefeature'),
    path('addYacht/', YachtCreateView.as_view(), name='addyacht'),
    path('detailYacht/', YachtProductView.as_view(), name='yachtproduct'),
    path('addPenthouse/', PentHouseCreateView.as_view(), name='addpenthouse'),
    path('detailPenthouse/', PentHouseProductView.as_view(), name='yachtproduct'),
    path('addAircraft/', AircraftCreateView.as_view(), name='addaircraft'),
    path('detailAircraft/', AircraftProductView.as_view(), name='aircraftproduct'),
    path('addAutomobile/', AutomobileCreateView.as_view(), name='addaircraft'),
    path('detailAutomobile/', AutomobileProductView.as_view(), name='aircraftproduct'),
    path('automobiles/', AutomobileProductView.as_view(), name='aircraftproduct'),
    path('penthouses/', AutomobileProductView.as_view(), name='aircraftproduct'),
    path('aircrafts/', AutomobileProductView.as_view(), name='aircraftproduct'),
    path('yachts/', YachtsView.as_view(), name='yachts'),
    
]