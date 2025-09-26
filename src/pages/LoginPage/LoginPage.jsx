import { useState } from "react"
import { supabase } from "../../supabaseClient"
import { useNavigate } from "react-router-dom"
import styles from "./LoginPage.module.css"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isRegister, setIsRegister] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    let result

    if (isRegister) {
      result = await supabase.auth.signUp({ email, password })
    } else {
      result = await supabase.auth.signInWithPassword({ email, password })
    }

    if (result.error) {
      alert(result.error.message)
      return
    }

    // Cargar rol desde profiles
    const { data, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", result.data.user.id)
      .single()

    if (error) {
      console.error("Error al obtener perfil:", error.message)
      return
    }

    navigate(data.role === "admin" ? "/admin" : "/worker")
  }

  return (
    <div className={styles.container}>
      <div className="card">
        <h1 className="card-header">{isRegister ? "Registro" : "Login"}</h1>
        <form onSubmit={handleSubmit} className="card-body">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="ejemplo@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            placeholder="******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
            {isRegister ? "Registrarse" : "Entrar"}
          </button>
        </form>
        <div
          className={styles.toggle}
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Ya tengo cuenta" : "Quiero registrarme"}
        </div>
      </div>
    </div>
  )
}
