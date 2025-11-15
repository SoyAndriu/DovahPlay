from rest_framework import viewsets, mixins
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Serie, Genero
from .serializers import (
    SerieListSerializer,
    SerieDetailSerializer,
    GeneroSerializer,
)


class SerieViewSet(viewsets.ReadOnlyModelViewSet):
    """
    GET /api/series/         -> listado de series
    GET /api/series/{slug}/  -> detalle de una serie con temporadas + episodios
    """

    lookup_field = "slug"  # para usar slug en la URL
    queryset = Serie.objects.all().prefetch_related("generos", "temporadas__episodios")

    def get_serializer_class(self):
        if self.action == "retrieve":
            return SerieDetailSerializer
        return SerieListSerializer

    @action(detail=False, methods=["get"])
    def destacadas(self, request):
        """
        GET /api/series/destacadas/
        """
        qs = self.get_queryset().filter(es_destacada=True)
        serializer = SerieListSerializer(qs, many=True)
        return Response(serializer.data)


class GeneroViewSet(viewsets.ReadOnlyModelViewSet):
    """
    GET /api/generos/
    GET /api/generos/{pk}/
    """

    queryset = Genero.objects.all().order_by("nombre")
    serializer_class = GeneroSerializer
