import { useEffect, useMemo, useState } from "react";
import styles from "../ApiCancionList/ApiCancionList.module.css";

export default function ApiCancionList() {
  const [rows, setRows] = useState([]);
  const [state, setState] = useState({ loading: true, error: null });

  const [query, setQuery] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("valoracion");
  const [sortDir, setSortDir] = useState("desc");

  useEffect(() => {
    let canceled = false;
    (async () => {
      try {
        // Usamos la misma API de Ghibli del profe, mapeando a "canción"
        const res = await fetch("https://ghibliapi.vercel.app/films", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const raw = await res.json();
        if (canceled) return;

        const mapped = (Array.isArray(raw) ? raw : []).map((f) => ({
          id: f.id,
          titulo: f.title,                   // título canción
          artista: "Studio Ghibli OST",      // ejemplo
          album: f.original_title || "OST",
          imagenAlbum: f.image || f.movie_banner || "",
          duracion: 120 + ((Number(f.rt_score) || 50) % 180), // 120–300s
          valoracion: f.rt_score ? Math.round((Number(f.rt_score) / 10) * 10) / 10 : null, // 0–10
          descripcion: f.description || "",
        }));

        setRows(mapped);
        setState({ loading: false, error: null });
      } catch (e) {
        setState({ loading: false, error: e.message || "Error cargando API" });
      }
    })();
    return () => { canceled = true; };
  }, []);

  const lista = useMemo(() => {
    const f = rows
      .filter((c) => c.titulo.toLowerCase().includes(query.trim().toLowerCase()))
      .filter((c) => Number(c.valoracion ?? 0) >= Number(minRating));

    const s = [...f].sort((a, b) => {
      let comp = 0;
      if (sortBy === "valoracion") comp = Number(a.valoracion ?? 0) - Number(b.valoracion ?? 0);
      else if (sortBy === "duracion") comp = Number(a.duracion ?? 0) - Number(b.duracion ?? 0);
      else if (sortBy === "titulo") comp = a.titulo.localeCompare(b.titulo);
      return sortDir === "asc" ? comp : -comp;
    });
    return s;
  }, [rows, query, minRating, sortBy, sortDir]);

  if (state.loading) return <p className={styles.status}>Cargando…</p>;
  if (state.error)   return <p className={styles.error}>Error: {state.error}</p>;

  const mmss = (s) => `${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`;

  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <h2>Canciones (API pública)</h2>
      </header>

      <div className={styles.controls}>
        <input className={styles.input} placeholder="Buscar por título…" value={query} onChange={(e) => setQuery(e.target.value)} />
        <label className={styles.row}>
          Min ★
          <input className={styles.number} type="number" min="0" max="10" step="0.1" value={minRating} onChange={(e) => setMinRating(e.target.value)} />
        </label>
        <label className={styles.row}>
          Ordenar por
          <select className={styles.select} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="valoracion">valoracion</option>
            <option value="duracion">duracion</option>
            <option value="titulo">titulo</option>
          </select>
        </label>
        <label className={styles.row}>
          Dirección
          <select className={styles.select} value={sortDir} onChange={(e) => setSortDir(e.target.value)}>
            <option value="desc">desc</option>
            <option value="asc">asc</option>
          </select>
        </label>
      </div>

      <ul className={styles.grid}>
        {lista.map((c) => (
          <li key={c.id} className={styles.card}>
            <img
              className={styles.poster}
              src={c.imagenAlbum || "https://via.placeholder.com/300x300?text=Sin+Imagen"}
              alt={`Portada de ${c.album}`}
              loading="lazy"
              onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/300x300?text=Sin+Imagen"; }}
            />
            <div className={styles.body}>
              <h3 className={styles.title}>{c.titulo}</h3>
              <p className={styles.meta}>
                {c.album} • {c.artista} • ⏱ {mmss(c.duracion)} • ⭐ {c.valoracion ?? "N/A"}
              </p>
              <p className={styles.plot}>{c.descripcion}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
