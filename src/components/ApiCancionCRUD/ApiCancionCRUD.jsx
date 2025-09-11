// src/components/ApiCancionCRUD/ApiCancionCRUD.jsx
import { useEffect, useMemo, useState } from "react";
import styles from "./ApiCancionCRUD.module.css";

const API = "https://jsonplaceholder.typicode.com/posts";

// Mapea un "post" de JSONPlaceholder a nuestra "canción"
function toCancion(p) {
  const id = Number(p.id);
  return {
    id,
    title: p.title ? p.title.charAt(0).toUpperCase() + p.title.slice(1) : `Canción demo ${id}`,
    artist: `Artista ${id}`,
    album: `Álbum ${Math.ceil(id / 3)}`,
    duration: `${3 + (id % 3)}:${(30 + (id % 30)).toString().padStart(2, "0")}`,
    rating: Math.floor(((id % 10) + 1)),
    // 🔴 siempre mostramos un placeholder
    poster: "https://via.placeholder.com/300x300?text=Canción",
    plot: p.body ?? "Sin descripción disponible",
  };
}

export default function ApiCancionCRUD() {
  const [canciones, setCanciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // filtros
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [sortDir, setSortDir] = useState("desc");
  const [minRating, setMinRating] = useState(0);

  // form
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    artist: "",
    album: "",
    duration: "",
    rating: "",
    plot: "",
  });

  // ---- READ: carga inicial ----
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API}?_limit=12`, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setCanciones((Array.isArray(data) ? data : []).map(toCancion));
        setError(null);
      } catch (e) {
        setError(e.message || "Error cargando API");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ---- derivado ----
  const filteredSorted = useMemo(() => {
    const f = canciones
      .filter((c) => c.title.toLowerCase().includes(query.trim().toLowerCase()))
      .filter((c) => Number(c.rating ?? 0) >= Number(minRating));

    return [...f].sort((a, b) => {
      let comp = 0;
      if (sortBy === "rating") comp = Number(a.rating) - Number(b.rating);
      else if (sortBy === "title") comp = a.title.localeCompare(b.title);
      return sortDir === "asc" ? comp : -comp;
    });
  }, [canciones, query, minRating, sortBy, sortDir]);

  // ---- form handlers ----
  const startCreate = () => {
    setEditingId(null);
    setForm({ title: "", artist: "", album: "", duration: "", rating: "", plot: "" });
  };

  const startEdit = (c) => {
    setEditingId(c.id);
    setForm({
      title: c.title,
      artist: c.artist,
      album: c.album,
      duration: c.duration,
      rating: c.rating,
      plot: c.plot,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  // ---- CREATE / UPDATE ----
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) {
      e.currentTarget.reportValidity();
      return;
    }

    const payload = {
      title: form.title.trim(),
      body: form.plot.trim(),
      rating: Number(form.rating) || 0,
    };

    try {
      if (editingId == null) {
        // CREATE
        const res = await fetch(API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const created = await res.json();
        setCanciones((prev) => [toCancion({ ...payload, id: created.id ?? Date.now() }), ...prev]);
      } else {
        // UPDATE
        const res = await fetch(`${API}/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const updated = await res.json();
        setCanciones((prev) =>
          prev.map((c) => (c.id === editingId ? toCancion({ ...c, ...updated }) : c))
        );
      }
      startCreate();
    } catch (e2) {
      setError(e2.message || "Error enviando datos");
    }
  };

  // ---- DELETE ----
  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que quieres borrar esta canción?")) return;
    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setCanciones((prev) => prev.filter((c) => c.id !== id));
    } catch (e2) {
      setError(e2.message || "Error borrando");
    }
  };

  if (loading) return <p className={styles.status}>Cargando…</p>;
  if (error) return <p className={styles.error}>Error: {error}</p>;

  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <h2>Canciones — CRUD (API pública)</h2>
        <div className={styles.stats}>
          <span>Total: <strong>{canciones.length}</strong></span>
        </div>
      </header>

      {/* Formulario */}
      <form className={styles.controls} onSubmit={handleSubmit} noValidate>
        <input className={styles.input} name="title" placeholder="Título *" value={form.title} onChange={handleChange} required />
        <input className={styles.input} name="artist" placeholder="Artista" value={form.artist} onChange={handleChange} />
        <input className={styles.input} name="album" placeholder="Álbum" value={form.album} onChange={handleChange} />
        <input className={styles.input} name="duration" placeholder="Duración" value={form.duration} onChange={handleChange} />
        <input className={styles.number} type="number" name="rating" placeholder="0–10" value={form.rating} onChange={handleChange} min="0" max="10" step="1" />
        <input className={styles.input} name="plot" placeholder="Descripción" value={form.plot} onChange={handleChange} />
        <button type="submit">{editingId == null ? "Crear" : "Guardar cambios"}</button>
        {editingId != null && <button type="button" onClick={startCreate}>Cancelar</button>}
      </form>

      {/* Filtros */}
      <div className={styles.controls}>
        <input className={styles.input} placeholder="Buscar por título…" value={query} onChange={(e) => setQuery(e.target.value)} />
        <label className={styles.row}>
          Min ★
          <input className={styles.number} type="number" value={minRating} onChange={(e) => setMinRating(e.target.value)} min="0" max="10" step="1" />
        </label>
      </div>

      {/* Listado */}
      <ul className={styles.grid}>
        {filteredSorted.map((c) => (
          <li key={c.id} className={styles.card}>
            <img className={styles.poster} src={c.poster} alt={`Portada de ${c.title}`} />
            <div className={styles.body}>
              <h3 className={styles.title}>{c.title}</h3>
              <p className={styles.meta}>{c.artist} • {c.album} • {c.duration} • ★ {c.rating}</p>
              <p className={styles.plot}>{c.plot}</p>
              <button onClick={() => startEdit(c)}>Editar</button>
              <button onClick={() => handleDelete(c.id)}>Borrar</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
