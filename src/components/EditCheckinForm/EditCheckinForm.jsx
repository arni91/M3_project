import { useState, useEffect } from "react"
import { supabase } from "../../supabaseClient"
import styles from "./EditCheckinForm.module.css"

export default function EditCheckinForm({ checkin, onSave, onCancel }) {
  const [type, setType] = useState(checkin?.type || "in")
  const [restaurantId, setRestaurantId] = useState(checkin?.restaurant_id || "")
  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    async function fetchRestaurants() {
      const { data } = await supabase.from("restaurants").select("*")
      setRestaurants(data)
    }
    fetchRestaurants()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    const { error } = await supabase
      .from("checkins")
      .update({ type, restaurant_id: restaurantId })
      .eq("id", checkin.id)
    if (error) alert(error.message)
    else onSave()
  }

  return (
    <div className={styles.overlay}>
      <form onSubmit={handleSubmit} className="card" style={{ maxWidth: "400px" }}>
        <h2 className="card-header">Editar fichaje</h2>
        <div className="card-body">
          <label>Tipo</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="in">Entrada</option>
            <option value="out">Salida</option>
          </select>
          <label>Restaurante</label>
          <select
            value={restaurantId}
            onChange={(e) => setRestaurantId(e.target.value)}
          >
            {restaurants.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>
        <div className="card-footer">
          <button type="submit" className="btn btn-success">Guardar</button>
          <button type="button" onClick={onCancel} className="btn btn-danger">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
