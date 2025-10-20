import { Link } from "react-router-dom";
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
  id: number;
};

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

export function CityItem({ city: c }: { city: City }) {
  return (
    <li>
      <Link
        to={`${c.id}?lat=${c.position.lat}&lng=${c.position.lng}`}
        className={styles.cityItem}
      >
        <span className={styles.emoji}>{c.emoji}</span>
        <h3 className={styles.name}>{c.cityName}</h3>
        <time className={styles.date}>{formatDate(c.date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}
