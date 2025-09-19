import { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient"; 
import styles from "./HealthCheck.module.css";

export default function HealthCheck() {
  const [status, setStatus] = useState("Comprobando...");

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { error } = await supabase.from("fichajes").select("count").limit(1);
        if (error) throw error;
        setStatus("✅ Conexión abierta con la DB");
      } catch {
        setStatus("❌ Sin conexión con la DB");
      }
    };
    checkConnection();
  }, []);

  return (
    <section className={styles.wrapper}>
      <h2>Estado de la conexión</h2>
      <p>{status}</p>
    </section>
  );
}
