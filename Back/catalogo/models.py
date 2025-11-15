from django.db import models

class Serie(models.Model):
    TIPO_CHOICES = [
        ('SERIE', 'Serie'),
        ('PELICULA', 'Película'),
    ]

    titulo = models.CharField(max_length=200)
    descripcion = models.TextField(blank=True)
    slug = models.SlugField(unique=True)
    poster = models.URLField(blank=True)      # o ImageField si más adelante usás media
    fondo = models.URLField(blank=True)       # idem
    tipo = models.CharField(max_length=10, choices=TIPO_CHOICES, default='SERIE')
    anio = models.PositiveIntegerField(null=True, blank=True)
    edad_recomendada = models.CharField(max_length=20, blank=True)  # ej: "13+", "16+"
    es_destacada = models.BooleanField(default=False)

    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.titulo


class Temporada(models.Model):
    serie = models.ForeignKey(Serie, on_delete=models.CASCADE, related_name='temporadas')
    numero = models.PositiveIntegerField()
    titulo = models.CharField(max_length=200, blank=True)
    descripcion = models.TextField(blank=True)

    class Meta:
        unique_together = ('serie', 'numero')
        ordering = ['numero']

    def __str__(self):
        return f"{self.serie.titulo} - Temporada {self.numero}"


class Episodio(models.Model):
    temporada = models.ForeignKey(Temporada, on_delete=models.CASCADE, related_name='episodios')
    numero = models.PositiveIntegerField()
    titulo = models.CharField(max_length=200)
    sinopsis = models.TextField(blank=True)
    duracion_minutos = models.PositiveIntegerField(null=True, blank=True)
    thumbnail = models.URLField(blank=True)
    video_url = models.URLField(blank=True)

    class Meta:
        unique_together = ('temporada', 'numero')
        ordering = ['numero']

    def __str__(self):
        return f"{self.temporada.serie.titulo} T{self.temporada.numero}E{self.numero} - {self.titulo}"


class Genero(models.Model):
    nombre = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True)
    series = models.ManyToManyField(Serie, related_name='generos', blank=True)

    class Meta:
        verbose_name = 'Género'
        verbose_name_plural = 'Géneros'
        ordering = ['nombre']

    def __str__(self):
        return self.nombre