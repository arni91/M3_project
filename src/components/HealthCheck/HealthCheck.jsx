import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

export default function HealthCheck() {
  const [status, setStatus] = useState("Comprobando...");

  useEffect(() => {
    const check = async () => {
      const { data, error } = await supabase.from("fichajes").select("id").limit(1);
      if (error) setStatus("❌ Sin conexión");
      else setStatus("✅ Conexión abierta");
    };
    check();
  }, []);

  return (
    <section>
      <h2>Probar Conexión</h2>
      <p>{status}</p>
    </section>
  );
}
