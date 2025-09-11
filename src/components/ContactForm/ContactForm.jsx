import { useCallback } from "react";
import styles from "./ContactForm.module.css";

export default function ContactForm() {
  const onSubmit = useCallback((e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const data = Object.fromEntries(new FormData(form).entries());
    console.log("Payload:", data);
    alert("¡Mensaje enviado! (simulado)");
    form.reset();
  }, []);

  return (
    <section className={styles.wrap}>
      <header className={styles.header}>
        <h2>Contacto</h2>
        <p className={styles.subtitle}>Escríbeme y te respondo.</p>
      </header>

      <form className={styles.form} onSubmit={onSubmit} noValidate>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Tus datos</legend>
          <div className={styles.grid2}>
            <label className={styles.label}>
              Nombre *
              <input className={styles.input} name="nombre" required minLength={2}/>
            </label>
            <label className={styles.label}>
              Email *
              <input className={styles.input} name="email" type="email" required/>
            </label>
          </div>
          <label className={styles.label}>
            Asunto
            <input className={styles.input} name="asunto" placeholder="Consulta sobre canciones…"/>
          </label>
          <label className={styles.label}>
            Mensaje *
            <textarea className={styles.textarea} name="mensaje" rows="5" required minLength={10}/>
          </label>
        </fieldset>

        <div className={styles.actions}>
          <button type="reset" className={styles.btnSecondary}>Reset</button>
          <button type="submit" className={styles.btnPrimary}>Enviar</button>
        </div>
      </form>
    </section>
  );
}
