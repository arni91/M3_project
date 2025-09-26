import styles from "./CheckinDetail.module.css"

export default function CheckinDetail({ checkin, onClose }) {
  if (!checkin) return null
  return (
    <div className={styles.overlay}>
      <div className="card" style={{ maxWidth: "400px" }}>
        <h2 className="card-header">Detalle del fichaje</h2>
        <div className="card-body">
          <p><strong>ID:</strong> {checkin.id}</p>
          <p><strong>Tipo:</strong> {checkin.type}</p>
          <p><strong>Restaurante:</strong> {checkin.restaurants.name}</p>
          <p><strong>Fecha:</strong> {new Date(checkin.timestamp).toLocaleString()}</p>
        </div>
        <div className="card-footer">
          <button onClick={onClose} className="btn btn-primary">Cerrar</button>
        </div>
      </div>
    </div>
  )
}
