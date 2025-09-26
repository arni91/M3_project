import { useState } from "react"
import { supabase } from "../../supabaseClient"
import styles from "./NavBar.module.css"

export default function NavBar() {
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  async function checkHealth() {
    setLoading(true)
    setStatus("Verificando conexión...")
    try {
      const { data, error } = await supabase
        .from("restaurants")
        .select("id")
        .limit(1) // ✅ evita error de múltiples filas

      if (error) throw error
      setStatus("✅ Conexión OK")
      console.log("Ping OK:", data)
    } catch (err) {
      console.error("Error conexión:", err.message)
      setStatus(`❌ Conexión FAIL: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  async function logout() {
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  return (
    <nav className={styles.nav}>
      <h1 className={styles.logo}>InOut</h1>
      <div>
        <button onClick={checkHealth} className="btn btn-primary">
          Probar conexión
        </button>
        {loading && <span className={styles.status}>⏳</span>}
        {status && <span className={styles.status}>{status}</span>}
        <button onClick={logout} className="btn btn-danger">
          Logout
        </button>
      </div>
    </nav>
  )
}
