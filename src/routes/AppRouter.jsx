import { Routes, Route, NavLink, Outlet } from "react-router-dom";
import FichajesList from "../components/FichajesList/FichajesList";
import FichajeForm from "../components/FichajeForm/FichajeForm";
import HealthCheck from "../components/HealthCheck/HealthCheck";

function Layout() {
  return (
    <>
      <header style={{ padding: "12px", borderBottom: "1px solid #eee" }}>
        <nav style={{ display: "flex", gap: 12 }}>
          <NavLink to="/fichajes">Fichajes</NavLink>
          <NavLink to="/nuevo">Nuevo Fichaje</NavLink>
          <NavLink to="/salud">Conexión</NavLink>
        </nav>
      </header>
      <main style={{ padding: "16px" }}>
        <Outlet />
      </main>
    </>
  );
}

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<FichajesList />} />
        <Route path="/fichajes" element={<FichajesList />} />
        <Route path="/nuevo" element={<FichajeForm />} />
        <Route path="/salud" element={<HealthCheck />} />
      </Route>
    </Routes>
  );
}
