import { useState } from "react";
import { supabase } from "../../supabaseClient";
import styles from "./FichajeForm.module.css";

export default function FichajeForm() {
  const [form, setForm] = useState({ trabajador: "", rol: "cocinero" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("fichajes").insert([form]);
    if (error) alert("Error creando fichaje: " + error.message);
    else alert("✅ Fichaje creado");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Nuevo Fichaje</h2>
      <label>
        Nombre
        <input name="trabajador" value={form.trabajador} onChange={handleChange} required />
      </label>
      <label>
        Rol
        <select name="rol" value={form.rol} onChange={handleChange}>
          <option value="cocinero">Cocinero</option>
          <option value="camarero">Camarero</option>
        </select>
      </label>
      <button type="submit">Crear</button>
    </form>
  );
}
