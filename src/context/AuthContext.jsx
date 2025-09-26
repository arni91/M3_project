import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../supabaseClient"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        if (error) throw error
        if (data.session) {
          setUser(data.session.user)
          await loadRole(data.session.user.id)
        }
      } catch (err) {
        console.error("Error en initSession:", err)
      } finally {
        setLoading(false)
      }
    }
    initSession()

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null)
        if (session?.user) {
          await loadRole(session.user.id)
        } else {
          setRole(null)
        }
      }
    )

    return () => {
      listener?.subscription.unsubscribe()
    }
  }, [])

  async function loadRole(userId) {
    const { data, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .single()

    if (error) {
      console.error("Error al cargar rol:", error.message)
      setRole(null)
    } else {
      setRole(data?.role ?? null)
    }
  }

  return (
    <AuthContext.Provider value={{ user, role, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
