import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../supabaseClient";
import styles from "./FichajeDetail.module.css";

export default function FichajeDetail() {
  const { id } = useParams();
  const [fichaje, setFichaje] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFichaje = async () => {
      try {
        const { data, error } = await supabase
          .from("fichajes")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setFichaje(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadFichaje();
  }, [id]);

  if (loading) return <p>Cargando detalle...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!fichaje) return <p>No encontrado</p>;

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Detalle del fichaje</h2>
      <p className={styles.field}>
        <strong>Trabajador:</strong> {fichaje.trabajador}
      </p>
      <p className={styles.field}>
        <strong>Rol:</strong> {fichaje.rol}
      </p>
      <p className={styles.field}>
        <strong>Checkin:</strong> {new Date(fichaje.checkin).toLocaleString()}
      </p>
      {fichaje.checkout && (
        <p className={styles.field}>
          <strong>Checkout:</strong>{" "}
          {new Date(fichaje.checkout).toLocaleString()}
        </p>
      )}
    </section>
  );
}
