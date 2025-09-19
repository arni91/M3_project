import { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient"; 
import styles from "./FichajesList.module.css";

export default function FichajesList() {
  const [fichajes, setFichajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFichajes = async () => {
      try {
        const { data, error } = await supabase
          .from("fichajes")
          .select("*")
          .order("checkin", { ascending: false });

        if (error) throw error;
        setFichajes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadFichajes();
  }, []);

  if (loading) return <p className={styles.status}>Cargando fichajes...</p>;
  if (error) return <p className={styles.error}>Error: {error}</p>;

  return (
    <section className={styles.wrapper}>
      <h2>Listado de Fichajes</h2>
      <ul className={styles.list}>
        {fichajes.map((f) => (
          <li key={f.id} className={styles.item}>
            <p>
              <strong>{f.trabajador}</strong> ({f.rol})
            </p>
            <p>Checkin: {new Date(f.checkin).toLocaleString()}</p>
            {f.checkout && <p>Checkout: {new Date(f.checkout).toLocaleString()}</p>}
          </li>
        ))}
      </ul>
    </section>
  );
}
