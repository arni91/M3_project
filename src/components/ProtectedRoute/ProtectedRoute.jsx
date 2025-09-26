import { Navigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

export default function ProtectedRoute({ children, role }) {
  const { user, role: userRole, loading } = useAuth()

  // mientras carga sesión o rol
 if (loading || userRole === null) return <p>Cargando...</p>

  // si no hay usuario -> login
  if (!user) return <Navigate to="/" />

  // si hay rol requerido y no coincide -> acceso denegado
  if (role && userRole !== role) {
    return <p>No tienes permisos para acceder a esta página.</p>
  }

  return children
}
