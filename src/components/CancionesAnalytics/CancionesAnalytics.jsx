import { useEffect, useMemo, useState } from "react";
import styles from "./CancionesAnalytics.module.css";
import CancionCard from "../CancionCard/CancionCard.jsx";

export default function CancionesAnalytics() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [query, setQuery] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("valoracion"); // valoracion | duracion | titulo | album
  const [sortDir, setSortDir] = useState("desc");     // asc | desc

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/canciones.json", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setRows(Array.isArray(data) ? data : []);
      } catch (e) {
        setError(e.message || "Error cargando JSON");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const stats = useMemo(() => {
    if (!rows.length) return { avgRating: 0, count: 0, top: null };
    const total = rows.reduce((s, c) => s + (c.valoracion ?? 0), 0);
    const top = rows.reduce((acc, c) => ((c.valoracion ?? 0) > (acc?.valoracion ?? -1) ? c : acc), null);
    return { avgRating: total / rows.length, count: rows.length, top };
  }, [rows]);

  const filteredSorted = useMemo(() => {
    const f = rows
      .filter((c) => c.titulo.toLowerCase().includes(query.trim().toLowerCase()))
      .filter((c) => (c.valoracion ?? 0) >= Number(minRating));

    const s = [...f].sort((a, b) => {
      let comp = 0;
      if (sortBy === "valoracion") comp = (a.valoracion ?? 0) - (b.valoracion ?? 0);
      else if (sortBy === "duracion") comp = (a.duracion ?? 0) - (b.duracion ?? 0);
      else if (sortBy === "titulo") comp = a.titulo.localeCompare(b.titulo);
      else if (sortBy === "album") comp = a.album.localeCompare(b.album);
      return sortDir === "asc" ? comp : -comp;
    });
    return s;
  }, [rows, query, minRating, sortBy, sortDir]);

  if (loading) return <p className={styles.status}>Cargando…</p>;
  if (error)   return <p className={styles.error}>Error: {error}</p>;

  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <h2>Canciones Analytics (JS Array methods)</h2>
        <div className={styles.stats}>
          <span>Total: <strong>{stats.count}</strong></span>
          <span>Promedio ★ <strong>{stats.avgRating.toFixed(2)}</strong></span>
          {stats.top && <span>Top: <strong>{stats.top.titulo} ({stats.top.valoracion})</strong></span>}
        </div>
      </header>

      <div className={styles.controls}>
        <label className={styles.srOnly} htmlFor="q">Buscar por título</label>
        <input
          id="q"
          className={styles.input}
          placeholder="Buscar por título…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <label className={styles.row}>
          Min ★
          <input
            className={styles.number}
            type="number"
            min="0" max="5" step="1"
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
          />
        </label>
        <label className={styles.row}>
          Ordenar por
          <select className={styles.select} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="valoracion">valoracion</option>
            <option value="duracion">duracion</option>
            <option value="titulo">titulo</option>
            <option value="album">album</option>
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
        {filteredSorted.map((c, i) => (
          <CancionCard key={`${c.titulo}-${i}`} cancion={c} />
        ))}
      </ul>

      <details className={styles.details}>
        <summary>Sólo títulos (map)</summary>
        <pre className={styles.code}>
{JSON.stringify(filteredSorted.map(m => m.titulo), null, 2)}
        </pre>
      </details>
    </section>
  );
}
