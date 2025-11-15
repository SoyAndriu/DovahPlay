from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SerieViewSet, GeneroViewSet

router = DefaultRouter()
router.register(r"series", SerieViewSet, basename="serie")
router.register(r"generos", GeneroViewSet, basename="genero")

urlpatterns = [
    path("", include(router.urls)),
]
