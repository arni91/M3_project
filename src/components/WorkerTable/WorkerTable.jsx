import styles from "./WorkerTable.module.css"

export default function WorkerTable({ checkins }) {
  if (!checkins || checkins.length === 0) {
    return <p>No tienes fichajes todavía.</p>
  }

  return (
    <div className="card">
      <h2 className="card-header">Mis fichajes</h2>
      <div className="card-body">
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Restaurante</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {checkins.map((c) => (
              <tr key={c.id}>
                <td className={c.type === "in" ? styles.in : styles.out}>
                  {c.type.toUpperCase()}
                </td>
                <td>{c.restaurants.name}</td>
                <td>{new Date(c.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
