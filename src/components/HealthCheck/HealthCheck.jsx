import { useState } from "react";
import { supabase } from "../../../supabaseClient";
import styles from "./HealthCheck.module.css";

export default function HealthCheck() {
  const [status, setStatus] = useState("Sin comprobar");

  const checkConnection = async () => {
    setStatus("Comprobando...");
    try {
      const { error } = await supabase.from("fichajes").select("id").limit(1);
      if (error) throw error;
      setStatus("✅ Conexión abierta con la DB");
    } catch {
      setStatus("❌ Sin conexión con la DB");
    }
  };

  return (
    <section className={styles.wrapper}>
      <h2>Estado de la conexión</h2>
      <button onClick={checkConnection} className={styles.button}>
        Probar conexión
      </button>
      <p>{status}</p>
    </section>
  );
}
