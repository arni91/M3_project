import { useState, useEffect } from "react"
import { supabase } from "../../supabaseClient"

export default function CheckinForm({ user, onCheckinDone }) {
  const [restaurants, setRestaurants] = useState([])
  const [selectedRestaurant, setSelectedRestaurant] = useState("")
  const [lastAction, setLastAction] = useState(null) // guardamos el último fichaje

  useEffect(() => {
    async function fetchRestaurants() {
      const { data, error } = await supabase.from("restaurants").select("*")
      if (error) console.error("Error cargando restaurantes:", error.message)
      setRestaurants(data || [])
    }
    fetchRestaurants()
  }, [])

  useEffect(() => {
    async function fetchLastCheckin() {
      if (!user) return
      const { data, error } = await supabase
        .from("checkins")
        .select("type")
        .eq("user_id", user.id)
        .order("timestamp", { ascending: false }) // ✅ corregido
        .limit(1)
        .single()

      if (error) {
        console.error("Error cargando último fichaje:", error.message)
        setLastAction(null)
      } else {
        setLastAction(data?.type ?? null) // "in" o "out"
      }
    }
    fetchLastCheckin()
  }, [user])

  async function doCheckin(type) {
    if (!selectedRestaurant) return alert("Selecciona un restaurante")

    const { error } = await supabase.from("checkins").insert({
      user_id: user.id,
      restaurant_id: selectedRestaurant,
      type,
    })

    if (error) {
      alert(error.message)
    } else {
      setLastAction(type) // actualizamos último fichaje en el estado
      onCheckinDone && onCheckinDone()
    }
  }

  return (
    <div className="card">
      <h2 className="card-header">Fichar</h2>
      <div className="card-body">
        <select
          onChange={(e) => setSelectedRestaurant(e.target.value)}
          className="select"
        >
          <option value="">Selecciona restaurante</option>
          {restaurants.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>

        <div style={{ marginTop: "16px", display: "flex", gap: "12px" }}>
          <button
            onClick={() => doCheckin("in")}
            className="btn btn-success"
            disabled={lastAction === "in"}
          >
            Fichar Entrada
          </button>

          <button
            onClick={() => doCheckin("out")}
            className="btn btn-danger"
            disabled={lastAction === "out"}
          >
            Fichar Salida
          </button>
        </div>

        {lastAction && (
          <p style={{ marginTop: "10px" }}>
            Última acción registrada:{" "}
            {lastAction === "in" ? "Entrada" : "Salida"}
          </p>
        )}
      </div>
    </div>
  )
}
