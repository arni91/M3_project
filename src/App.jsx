import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import LoginPage from "./pages/LoginPage/LoginPage.jsx"
import WorkerPage from "./pages/WorkerPage/WorkerPage.jsx"
import AdminPage from "./pages/AdminPage/AdminPage.jsx"
import NavBar from "./components/NavBar/NavBar.jsx"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx"

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/worker"
            element={
              <ProtectedRoute role="worker">
                <WorkerPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
