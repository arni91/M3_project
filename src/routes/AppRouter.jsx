import { Routes, Route, NavLink, Outlet } from "react-router-dom";
import FichajesList from "../components/FichajesList/FichajesList";
import FichajeForm from "../components/FichajeForm/FichajeForm";
import HealthCheck from "../components/HealthCheck/HealthCheck";
import FichajeDetail from "../components/FichajeDetail/FichajeDetail";
import styles from "./AppRouter.module.css";

function Layout() {
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <NavLink
            to="/salud"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Conexión
          </NavLink>
          <NavLink
            to="/nuevo"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Fichar
          </NavLink>
          <NavLink
            to="/fichajes"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Listado de fichajes
          </NavLink>
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
        <Route path="/fichajes/:id" element={<FichajeDetail />} />
      </Route>
    </Routes>
  );
}
