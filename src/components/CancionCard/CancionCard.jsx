import styles from "./CancionCard.module.css";

export default function CancionCard({ cancion }) {
  const { titulo, album, imagenAlbum, duracion, valoracion } = cancion ?? {};
  const mmss = (s) => `${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`;

  return (
    <li className={styles.card}>
      <img
        className={styles.poster}
        src={imagenAlbum}
        alt={`Portada de ${album}`}
        loading="lazy"
        onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/300?text=Img"; }}
      />
      <div className={styles.body}>
        <h3 className={styles.title}>{titulo}</h3>
        <p className={styles.meta}>
          <span className={styles.badge}>{album}</span>
          <span className={styles.dot}>•</span>
          <span>⏱ {mmss(duracion)}</span>
          <span className={styles.dot}>•</span>
          <span className={styles.rating}>★ {valoracion}/5</span>
        </p>
      </div>
    </li>
  );
}
