from django.contrib import admin
from .models import Serie, Temporada, Episodio, Genero


@admin.register(Serie)
class SerieAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'tipo', 'anio', 'es_destacada')
    list_filter = ('tipo', 'es_destacada', 'anio')
    prepopulated_fields = {"slug": ("titulo",)}
    search_fields = ('titulo',)


@admin.register(Temporada)
class TemporadaAdmin(admin.ModelAdmin):
    list_display = ('serie', 'numero', 'titulo')
    list_filter = ('serie',)


@admin.register(Episodio)
class EpisodioAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'temporada', 'numero', 'duracion_minutos')
    list_filter = ('temporada__serie',)
    search_fields = ('titulo',)


@admin.register(Genero)
class GeneroAdmin(admin.ModelAdmin):
    list_display = ('nombre',)
    prepopulated_fields = {"slug": ("nombre",)}
