import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>
        Inicio
      </NavLink>
      <NavLink to="/home" className={({ isActive }) => isActive ? "active" : ""}>
        Home
      </NavLink>
      <NavLink to="/canciones" className={({ isActive }) => isActive ? "active" : ""}>
        Canciones
      </NavLink>
    </nav>
  );
}
