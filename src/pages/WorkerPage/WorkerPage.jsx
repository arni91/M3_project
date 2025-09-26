import { useEffect, useState } from "react"
import { supabase } from "../../supabaseClient"
import { useAuth } from "../../context/AuthContext"
import CheckinForm from "../../components/CheckinForm/CheckinForm.jsx"
import WorkerTable from "../../components/WorkerTable/WorkerTable.jsx"
import styles from "./WorkerPage.module.css"

export default function WorkerPage() {
  const { user } = useAuth()
  const [checkins, setCheckins] = useState([])
  const [totalHours, setTotalHours] = useState(0)

  useEffect(() => {
    if (user) loadCheckins()
  }, [user])

  async function loadCheckins() {
    const { data } = await supabase
      .from("checkins")
      .select("*, restaurants(name)")
      .eq("user_id", user.id)
      .gte("timestamp", new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()) // 🔹 fichajes desde inicio del mes
      .order("timestamp", { ascending: true })

    if (data) {
      setCheckins(data)
      calculateHours(data)
    }
  }

  function calculateHours(data) {
    let total = 0
    for (let i = 0; i < data.length; i++) {
      if (data[i].type === "in") {
        const inTime = new Date(data[i].timestamp)
        const next = data[i + 1]
        if (next && next.type === "out") {
          const outTime = new Date(next.timestamp)
          total += (outTime - inTime) / (1000 * 60 * 60)
          i++ // saltar al siguiente
        }
      }
    }
    setTotalHours(total.toFixed(2))
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Mi panel</h1>
      <p className={styles.hours}>Horas acumuladas este mes: {totalHours} h</p>
      <CheckinForm user={user} onCheckinDone={loadCheckins} />
      <WorkerTable checkins={checkins} />
    </div>
  )
}
