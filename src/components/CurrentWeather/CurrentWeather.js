import { convertKphToMs } from '../../utils/helpers';
import styles from './CurrentWeather.module.css';

function CurrentWeather({ data }) {
  return (
    <div className={styles.currentWeather}>
      <div className={styles.location}>{data.location.name}, {data.location.country}</div>
      <div className={styles.temperature}>{data.current.temp_c}°C</div>
      <div className={styles.condition}>{data.current.condition.text}</div>
      <img src={data.current.condition.icon} alt="Weather Icon" className={styles.icon} />
      <div className={styles.details}>
        <div>
          <span className={styles.label}>Ветер:</span> {convertKphToMs(data.current.wind_kph)} м/с
        </div>
        <div>
          <span className={styles.label}>Влажность:</span> {data.current.humidity}%
        </div>
        <div>
          <span className={styles.label}>Осадки:</span> {data.current.precip_mm} мм
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;