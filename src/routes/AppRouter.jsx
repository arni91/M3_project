import { Routes, Route, Navigate, NavLink, Outlet } from "react-router-dom";
import CancionesList from "../components/CancionesList/CancionesList.jsx";
import CancionesAnalytics from "../components/CancionesAnalytics/CancionesAnalytics.jsx";
import ContactForm from "../components/ContactForm/ContactForm.jsx";

function Layout() {
  const link = ({ isActive }) => ({
    textDecoration: "none",
    color: isActive ? "#1d4ed8" : "#111827",
    fontWeight: isActive ? 700 : 500
  });
  return (
    <>
      <header style={{ padding: "12px 16px", borderBottom: "1px solid #eee" }}>
        <nav style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <NavLink to="/home" style={link}>Home</NavLink>
          <NavLink to="/analytics" style={link}>Analytics</NavLink>
          <NavLink to="/contacto" style={link}>Contacto</NavLink>
        </nav>
      </header>
      <main style={{ padding: 16 }}>
        <Outlet />
      </main>
    </>
  );
}

function NotFound() {
  return <p style={{ textAlign: "center", marginTop: "3rem", color: "#b91c1c" }}>404 · Ruta no encontrada</p>;
}

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<CancionesList />} />
        <Route path="/analytics" element={<CancionesAnalytics />} />
        <Route path="/contacto" element={<ContactForm />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
