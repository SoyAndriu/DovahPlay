from rest_framework import serializers
from .models import Serie, Temporada, Episodio, Genero


class EpisodioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Episodio
        fields = [
            "id",
            "numero",
            "titulo",
            "sinopsis",
            "duracion_minutos",
            "thumbnail",
            "video_url",
        ]


class TemporadaSerializer(serializers.ModelSerializer):
    episodios = EpisodioSerializer(many=True, read_only=True)

    class Meta:
        model = Temporada
        fields = [
            "id",
            "numero",
            "titulo",
            "descripcion",
            "episodios",
        ]


class GeneroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genero
        fields = [
            "id",
            "nombre",
            "slug",
        ]


# Para listados (home, carruseles, etc.)
class SerieListSerializer(serializers.ModelSerializer):
    generos = GeneroSerializer(many=True, read_only=True)

    class Meta:
        model = Serie
        fields = [
            "id",
            "titulo",
            "slug",
            "poster",
            "fondo",
            "tipo",
            "anio",
            "edad_recomendada",
            "es_destacada",
            "generos",
        ]


# Para detalle de una serie
class SerieDetailSerializer(serializers.ModelSerializer):
    generos = GeneroSerializer(many=True, read_only=True)
    temporadas = TemporadaSerializer(many=True, read_only=True)

    class Meta:
        model = Serie
        fields = [
            "id",
            "titulo",
            "slug",
            "descripcion",
            "poster",
            "fondo",
            "tipo",
            "anio",
            "edad_recomendada",
            "es_destacada",
            "generos",
            "temporadas",
        ]
