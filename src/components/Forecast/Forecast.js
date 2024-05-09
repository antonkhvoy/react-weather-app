import { convertKphToMs } from '../../utils/helpers';
import styles from './Forecast.module.css';
import moment from 'moment';
import 'moment/locale/ru';

function Forecast({ data, days }) {
  const forecastDays = data.forecast.forecastday.slice(0, days);

  return (
    <div className={styles.forecast}>
      <h2 className={styles.title}>Прогноз</h2>
      <div className={styles.forecastItems}>
        {forecastDays.map((day) => (
          <div key={day.date} className={styles.forecastItem}>
            <div className={styles.date}>
              <i className="fas fa-calendar-alt"></i> {moment(day.date).format('D MMMM YYYY, dddd')}
            </div>
            <img src={day.day.condition.icon} alt="Weather Icon" className={styles.icon} />
            <div className={styles.temperature}>
              <span className={styles.tempMax}>{day.day.maxtemp_c}°C</span>
              <span className={styles.tempMin}>{day.day.mintemp_c}°C</span>
            </div>
            <div className={styles.details}>
              <div>
                <span className={styles.label}>Ветер:</span> {convertKphToMs(day.day.maxwind_kph)} м/с
              </div>
              <div>
                <span className={styles.label}>Влажность:</span> {day.day.avghumidity}%
              </div>
              <div>
                <span className={styles.label}>Осадки:</span> {day.day.totalprecip_mm} мм
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;