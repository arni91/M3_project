import { useEffect, useState } from "react";
import "./CancionesList.module.css";

export default function CancionesList() {
  const [rows, setRows] = useState([]);
  const [state, setState] = useState({ loading: true, error: null });

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/canciones.json", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setRows(Array.isArray(data) ? data : []);
        setState({ loading: false, error: null });
      } catch (e) {
        setState({ loading: false, error: e.message || "Error cargando JSON" });
      }
    })();
  }, []);

  if (state.loading) return <p className="status">Cargando canciones…</p>;
  if (state.error)   return <p className="statusError">Error: {state.error}</p>;
  if (!rows.length)  return <p className="status">No hay canciones.</p>;

  const fmt = (s) => `${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`;

  return (
    <section className="list">
      <header className="header">
        <h2>Canciones</h2>
        <span className="count">{rows.length}</span>
      </header>

      <ul className="grid">
        {rows.map((c, i) => (
          <li className="card" key={i}>
            <figure className="figure">
              <img
                className="poster"
                src={c.imagenAlbum}
                alt={`Portada de ${c.album}`}
                loading="lazy"
                width="300" height="300"
                onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/300?text=Img"; }}
              />
              <figcaption className="caption">
                <h3 className="title">{c.titulo}</h3>
                <p className="meta">
                  <span className="badge">{c.album}</span>
                  <span className="dot">•</span>
                  <span>⏱ {fmt(c.duracion)}</span>
                  <span className="dot">•</span>
                  <span className="rating">★ {c.valoracion}/5</span>
                </p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
