import styles from "./Home.module.css";

export default function Home() {
  return (
    <section className={styles.home}>
      <h1>Bienvenid@ a mis Canciones</h1>
      <h2>Aquí encuentras el ejercicio de react_rutas</h2>
      <p>
        Si en la barra de navegación pones 
        <code> http://localhost:5173/cualquier_palabra </code> 
        que no sea "home" ni "canciones" te saldrá el error 404.
      </p>
    </section>
  );
}
