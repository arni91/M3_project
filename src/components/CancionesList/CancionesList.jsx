import { useEffect, useState } from "react";
import "./CancionesList.module.css";

export default function CancionesList() {
  const [canciones, setCanciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/canciones.json", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setCanciones(Array.isArray(data) ? data : []);
      } catch (e) {
        setError(e.message || "Error cargando JSON");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>Cargando canciones…</p>;
  if (error) return <p style={{color:"#b91c1c"}}>Error: {error}</p>;
  if (!canciones.length) return <p>No hay canciones.</p>;

  const mmss = (s) => `${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`;

  return (
    <section>
      <h2>Canciones</h2>
      <ul style={{listStyle:"none",padding:0,display:"grid",gap:"12px"}}>
        {canciones.map((c,i)=>(
          <li key={i} style={{border:"1px solid #ddd",borderRadius:"8px",padding:"10px",display:"grid",gridTemplateColumns:"80px 1fr",gap:"12px"}}>
            <img
              src={c.imagenAlbum}
              alt={`Portada de ${c.album}`}
              width="80"
              height="80"
              style={{objectFit:"cover",borderRadius:"6px"}}
              onError={(e)=>{e.currentTarget.src="https://via.placeholder.com/80?text=Img";}}
            />
            <div>
              <strong>{c.titulo}</strong>
              <div>{c.album} • ⏱ {mmss(c.duracion)} • ★ {c.valoracion}/5</div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
