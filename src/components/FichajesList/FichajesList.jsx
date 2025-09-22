import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../../supabaseClient";
import styles from "./FichajesList.module.css";

export default function FichajesList() {
  const [fichajes, setFichajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    //  debounce con timer
    const timer = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        let query = supabase
          .from("fichajes")
          .select("*")
          .order("checkin", { ascending: false });

        if (search) {
          query = query.ilike("trabajador", `%${search}%`);
        }

        const { data, error } = await query;
        if (error) throw error;
        setFichajes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, 400); // espera 400ms después de dejar de teclear

    return () => clearTimeout(timer); // limpiar timer al cambiar search
  }, [search]);

  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que quieres borrar este fichaje?")) return;
    try {
      const { error } = await supabase.from("fichajes").delete().eq("id", id);
      if (error) throw error;
      setFichajes((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      setError("Error al borrar: " + err.message);
    }
  };

  if (loading) return <p className={styles.status}>Cargando fichajes...</p>;
  if (error) return <p className={styles.error}>Error: {error}</p>;

  return (
    <section className={styles.wrapper}>
      <h2>Listado de Fichajes</h2>

      <input
        type="text"
        placeholder="Buscar por trabajador"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.search}
      />

      <ul className={styles.list}>
        {fichajes.map((f) => (
          <li key={f.id} className={styles.item}>
            <div className={styles.info}>
              <p>
                <strong>{f.trabajador}</strong> ({f.rol})
              </p>
              <p>Checkin: {new Date(f.checkin).toLocaleString()}</p>
              {f.checkout && (
                <p>Checkout: {new Date(f.checkout).toLocaleString()}</p>
              )}
            </div>
            <div className={styles.actions}>
              <Link to={`/fichajes/${f.id}`}>Ver detalle</Link>
              <button onClick={() => handleDelete(f.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>

      {fichajes.length === 0 && <p>No hay fichajes</p>}
    </section>
  );
}
