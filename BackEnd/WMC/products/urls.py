from django.urls import path
from .views import *

urlpatterns = [
    path('saveFeature/', SaveFeatureView.as_view(), name = 'savefeature'),
    
    path('deleteYacht/', DeleteYachtView.as_view(), name='deleteyacht'),
    path('addYacht/', YachtCreateView.as_view(), name='addyacht'),
    path('detailYacht/', YachtProductView.as_view(), name='yachtproduct'),
    
    path('addPenthouse/', PentHouseCreateView.as_view(), name='addpenthouse'),
    path('detailPenthouse/', PentHouseProductView.as_view(), name='penthouseproduct'),
    
    path('addAircraft/', AircraftCreateView.as_view(), name='addaircraft'),
    path('detailAircraft/', AircraftProductView.as_view(), name='aircraftproduct'),
    
    path('addAutomobile/', AutomobileCreateView.as_view(), name='addautomobile'),
    path('detailAutomobile/', AutomobileProductView.as_view(), name='automobileproduct'),

    path('automobiles/', AutomobileProductView.as_view(), name='automobiles'),
    path('penthouses/', PentHousesView.as_view(), name='penthouses'),
    path('aircrafts/', AircraftsView.as_view(), name='aircrafts'),
    path('yachts/', YachtsView.as_view(), name='yachts'),
    
]