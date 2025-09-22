import { Routes, Route, NavLink, Outlet, Navigate } from "react-router-dom";
import HealthCheck from "./components/HealthCheck/HealthCheck";
import FichajeForm from "./components/FichajeForm/FichajeForm";
import FichajesList from "./components/FichajesList/FichajesList";
import "./App.css";

function Layout() {
  const linkStyle = ({ isActive }) => ({
    textDecoration: "none",
    color: isActive ? "#2563eb" : "#111827",
    fontWeight: isActive ? "700" : "500",
  });

  return (
    <>
      <header style={{ padding: "12px 16px", borderBottom: "1px solid #eee" }}>
        <nav style={{ display: "flex", gap: "1rem" }}>
          <NavLink to="/health" style={linkStyle}>
            Conexión
          </NavLink>
          <NavLink to="/form" style={linkStyle}>
            Fichar
          </NavLink>
          <NavLink to="/list" style={linkStyle}>
            Listado
          </NavLink>
        </nav>
      </header>
      <main style={{ padding: "16px" }}>
        <Outlet />
      </main>
    </>
  );
}

function NotFound() {
  return <p>❌ 404 - Página no encontrada</p>;
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/health" replace />} />
        <Route path="/health" element={<HealthCheck />} />
        <Route path="/form" element={<FichajeForm />} />
        <Route path="/list" element={<FichajesList />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
