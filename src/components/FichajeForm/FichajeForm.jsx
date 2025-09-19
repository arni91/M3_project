import { useState } from "react";
import { supabase } from "../../../supabaseClient"; 
import styles from "./FichajeForm.module.css";

export default function FichajeForm() {
  const [trabajador, setTrabajador] = useState("");
  const [rol, setRol] = useState("cocinero");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleCheckin = async () => {
    setLoading(true);
    setMessage("");
    try {
      const { error } = await supabase.from("fichajes").insert([{ trabajador, rol }]);
      if (error) throw error;
      setMessage("Checkin registrado ✅");
    } catch (err) {
      setMessage("❌ Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    setLoading(true);
    setMessage("");
    try {
      const { data, error } = await supabase
        .from("fichajes")
        .update({ checkout: new Date().toISOString() })
        .eq("trabajador", trabajador)
        .is("checkout", null); // solo fichaje abierto

      if (error) throw error;
      if (!data || data.length === 0) {
        setMessage("⚠️ No hay checkin abierto para este trabajador");
      } else {
        setMessage("Checkout registrado ✅");
      }
    } catch (err) {
      setMessage("❌ Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.wrapper}>
      <h2>Formulario de Fichaje</h2>
      <div className={styles.form}>
        <input
          type="text"
          placeholder="Nombre trabajador"
          value={trabajador}
          onChange={(e) => setTrabajador(e.target.value)}
          required
        />
        <select value={rol} onChange={(e) => setRol(e.target.value)}>
          <option value="cocinero">Cocinero</option>
          <option value="camarero">Camarero</option>
        </select>

        <div className={styles.buttons}>
          <button onClick={handleCheckin} disabled={loading || !trabajador}>
            Checkin
          </button>
          <button onClick={handleCheckout} disabled={loading || !trabajador}>
            Checkout
          </button>
        </div>
      </div>
      {message && <p className={styles.message}>{message}</p>}
    </section>
  );
}
