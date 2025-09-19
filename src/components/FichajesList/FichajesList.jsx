import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import styles from "./FichajesList.module.css";

export default function FichajesList() {
  const [fichajes, setFichajes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFichajes = async () => {
      const { data, error } = await supabase.from("fichajes").select("*").order("checkin", { ascending: false });
      if (!error) setFichajes(data);
      setLoading(false);
    };
    fetchFichajes();
  }, []);

  if (loading) return <p>Cargando...</p>;

  return (
    <section className={styles.wrapper}>
      <h2>Listado de Fichajes</h2>
      <ul className={styles.list}>
        {fichajes.map((f) => (
          <li key={f.id} className={styles.item}>
            <strong>{f.trabajador}</strong> ({f.rol})  
            <br />
            Entrada: {new Date(f.checkin).toLocaleString()}  
            <br />
            Salida: {f.checkout ? new Date(f.checkout).toLocaleString() : "—"}
          </li>
        ))}
      </ul>
    </section>
  );
}
