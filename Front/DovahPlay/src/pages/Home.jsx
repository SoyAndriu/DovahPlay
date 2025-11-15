import React, { useEffect, useState} from 'react'

function cssTarjetas() {
  return "w-32 h-40 bg-slate-700 rounded hover:scale-105 hover:bg-slate-600 transition-transform transition-colors";
}

export default function Home() {
  const [seriesDestacadas, setSeriesDestacadas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSeriesDestacadas() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch('http://localhost:8000/api/series/destacadas/');

        if (!res.ok) {
          throw new Error(`Error HTTP: ${res.status}`);
        }

        const data = await res.json();
        setSeriesDestacadas(data); // data es un array de series
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar las series destacadas.");
      } finally {
        setLoading(false);
      }
    }

    fetchSeriesDestacadas();
  }, []);

  return (
    <div className="px-4 py-6 space-y-10">

      {/* Hero */}
      <section className="relative h-[60vh] rounded-xl overflow-hidden shadow-xl shadow-black/40">
        <img src="/images/misterioanubis1.png" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/30 to-transparent backdrop-blur-[1px]"></div>
        <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 max-w-xl mx-auto gap-4">
          <p className="text-xs md:text-sm font-semibold text-yellow-400 uppercase tracking-wide">
            Serie destacada
          </p>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            El misterio de Anubis
          </h1>

          <p className="text-sm md:text-base text-slate-200">
            Un grupo de estudiantes descubre secretos antiguos, cámaras ocultas
            y enigmas en un internado lleno de misterios.
          </p>

          <div className="flex flex-wrap gap-3 mt-2">
            <button className="flex items-center gap-2 px-6 py-2 rounded-md bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition-colors">
              <span>▶</span>
              <span>Reproducir</span>
            </button>

            <button className="px-6 py-2 rounded-md bg-white/15 text-white font-semibold hover:bg-white/20 hover:backdrop-blur-sm transition-colors">
              Más información
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 w-full h-24 bg-linear-to-b from-transparent to-slate-950"></div>
      </section>
      
      {/* Seccion Series Destacadas */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Series destacadas</h2>

        {loading && (
          <p className="text-sm text-slate-300">Cargando series destacadas...</p>
        )}

        {error && (
          <p className="text-sm text-red-400">
            {error}
          </p>
        )}

        {!loading && !error && seriesDestacadas.length === 0 && (
          <p className="text-sm text-slate-300">
            Todavía no hay series destacadas cargadas.
          </p>
        )}

        {!loading && !error && seriesDestacadas.length > 0 && (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {seriesDestacadas.map((serie) => (
              <div key={serie.id} className={cssTarjetas()}>
                {/* Imagen de poster si viene, sino un fondo sólido */}
                <div className="w-full h-full relative">
                  {serie.poster ? (
                    <img
                      src={serie.poster}
                      alt={serie.titulo}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-700 flex items-center justify-center">
                      <span className="text-sm text-slate-200">
                        Sin imagen
                      </span>
                    </div>
                  )}

                  {/* Overlay con título/metadata abajo */}
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 via-black/70 to-transparent p-2">
                    <h3 className="text-xs font-semibold truncate">
                      {serie.titulo}
                    </h3>
                    <p className="text-[10px] text-slate-300 flex items-center gap-1">
                      <span>{serie.tipo === "SERIE" ? "Serie" : "Película"}</span>
                      {serie.anio && <span>· {serie.anio}</span>}
                      {serie.edad_recomendada && (
                        <span className="ml-auto px-1 rounded bg-slate-800 text-[9px]">
                          {serie.edad_recomendada}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}