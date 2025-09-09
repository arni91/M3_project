import { Link } from "react-router-dom";
import "./NotFound.module.css";

export default function NotFound() {
  return (
    <section className="notfound">
      <h1>404</h1>
      <p>Ups, esa ruta no existe.</p>
      <p>
        <Link to="/">Volver al inicio</Link>
      </p>
    </section>
  );
}
