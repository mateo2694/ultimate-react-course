import { Spinner } from "./Spinner";
import { type City } from "./CityItem";
import { Message } from "./Message";
import { CountryItem, type Country } from "./CountryItem";
import styles from "./CountryList.module.css";

export function CountryList({
  cities,
  isLoading,
}: {
  cities: City[];
  isLoading: boolean;
}) {
  if (isLoading) return <Spinner />;

  const countries = cities.reduce((acc, curr) => {
    if (!acc.some((c) => c.country === curr.country)) {
      acc.push({ country: curr.country, emoji: curr.emoji });
    }
    return acc;
  }, [] as Country[]);

  if (!countries.length) {
    return (
      <Message message="Add your fisrst city by clicking on a city on the map" />
    );
  }
  return (
    <ul className={styles.countryList}>
      {countries.map((c) => (
        <CountryItem key={c.country} country={c} />
      ))}
    </ul>
  );
}
