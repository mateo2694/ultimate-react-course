import styles from "./CountryItem.module.css";

export type Country = {
  country: string;
  emoji: string;
};

export function CountryItem({ country }: { country: Country }) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}
