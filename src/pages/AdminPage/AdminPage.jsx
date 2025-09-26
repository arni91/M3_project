import { useEffect, useState } from "react"
import { supabase } from "../../supabaseClient"
import styles from "./AdminPage.module.css"
import CheckinDetail from "../../components/CheckinDetail/CheckinDetail.jsx"
import EditCheckinForm from "../../components/EditCheckinForm/EditCheckinForm.jsx"

export default function AdminPage() {
  const [workers, setWorkers] = useState([])
  const [selectedWorker, setSelectedWorker] = useState(null)
  const [checkins, setCheckins] = useState([])

  const [detail, setDetail] = useState(null)
  const [editing, setEditing] = useState(null)

  // 🔍 estado de búsqueda
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetchWorkers()
  }, [])

  // 🔹 Obtener todos los trabajadores (role = worker)
  async function fetchWorkers() {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, full_name, email, role")
      .eq("role", "worker")

    if (error) {
      console.error("Error cargando workers:", error.message)
      return
    }

    setWorkers(data)
  }

  // 🔹 Ver fichajes de un trabajador
  async function viewCheckins(workerId) {
    setSelectedWorker(workerId)
    const { data, error } = await supabase
      .from("checkins")
      .select("*, restaurants(name)")
      .eq("user_id", workerId)
      .order("timestamp", { ascending: false })

    if (error) {
      console.error("Error cargando fichajes:", error.message)
      setCheckins([])
    } else {
      setCheckins(data || [])
    }
  }

  // 🔹 Eliminar fichaje
  async function deleteCheckin(id) {
    const { error } = await supabase.from("checkins").delete().eq("id", id)
    if (error) {
      console.error("Error eliminando fichaje:", error.message)
      return
    }
    setCheckins(checkins.filter((c) => c.id !== id))
  }

  // 🔹 Filtrar trabajadores por nombre o email
  const filteredWorkers = workers.filter(
    (w) =>
      (w.full_name &&
        w.full_name.toLowerCase().includes(search.toLowerCase())) ||
      (w.email && w.email.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Panel Admin</h1>

      {/* Lista de trabajadores */}
      <div className="card">
        <h2 className="card-header">Trabajadores</h2>
        <div className="card-body">
          {/* 🔍 Input de búsqueda */}
          <input
            type="text"
            placeholder="Buscar trabajador por nombre o email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ marginBottom: "12px", width: "100%", padding: "8px" }}
          />

          <ul>
            {filteredWorkers.map((w) => (
              <li key={w.id} className={styles.workerItem}>
                {w.full_name || w.email}
                <button
                  onClick={() => viewCheckins(w.id)}
                  className="btn btn-primary"
                  style={{ marginLeft: "12px" }}
                >
                  Ver fichajes
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Fichajes del trabajador seleccionado */}
      {selectedWorker && (
        <div className="card">
          <h2 className="card-header">Fichajes del trabajador</h2>
          <div className="card-body">
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Restaurante</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {checkins.map((c) => (
                  <tr key={c.id}>
                    <td style={{ color: c.type === "in" ? "green" : "red" }}>
                      {c.type.toUpperCase()}
                    </td>
                    <td>{c.restaurants?.name || "N/A"}</td>
                    <td>{new Date(c.timestamp).toLocaleString()}</td>
                    <td>
                      <button
                        onClick={() => setDetail(c)}
                        className="btn btn-primary"
                      >
                        Ver detalle
                      </button>
                      <button
                        onClick={() => setEditing(c)}
                        className="btn btn-success"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => deleteCheckin(c.id)}
                        className="btn btn-danger"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal detalle */}
      {detail && (
        <CheckinDetail checkin={detail} onClose={() => setDetail(null)} />
      )}

      {/* Modal edición */}
      {editing && (
        <EditCheckinForm
          checkin={editing}
          onSave={() => {
            setEditing(null)
            viewCheckins(selectedWorker)
          }}
          onCancel={() => setEditing(null)}
        />
      )}
    </div>
  )
}
