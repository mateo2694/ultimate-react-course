import styles from "./CityItem.module.css";

export type City = {
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  position: {
    lat: number;
    lng: number;
  };
  id: string;
};

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

export function CityItem({ city: c }: { city: City }) {
  return (
    <li className={styles.cityItem}>
      <span className={styles.emoji}>{c.emoji}</span>
      <h3 className={styles.name}>{c.cityName}</h3>
      <time className={styles.date}>{formatDate(c.date)}</time>
      <button className={styles.deleteBtn}>&times;</button>
    </li>
  );
}
