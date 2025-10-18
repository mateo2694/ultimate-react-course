import { Spinner } from "./Spinner";
import { CityItem, type City } from "./CityItem";
import { Message } from "./Message";
import styles from "./CityList.module.css";

export function CityList({
  cities,
  isLoading,
}: {
  cities: City[];
  isLoading: boolean;
}) {
  if (isLoading) return <Spinner />;
  if (!cities.length) {
    return (
      <Message message="Add your fisrst city by clicking on a city on the map" />
    );
  }
  return (
    <ul className={styles.cityList}>
      {cities.map((c) => (
        <CityItem key={c.id} city={c} />
      ))}
    </ul>
  );
}
