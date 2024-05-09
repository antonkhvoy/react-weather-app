import { useState, useEffect } from 'react';
import LocationInput from '../LocationInput/LocationInput';
import CurrentWeather from '../CurrentWeather/CurrentWeather';
import Forecast from '../Forecast/Forecast';
import { getCurrentLocation } from '../../services/geolocationService';
import { getCurrentWeather, getForecast, searchLocations } from '../../services/weatherService';
import styles from './WeatherApp.module.css';

const weatherBackgrounds = {
  'Sunny': '/images/clear-sky.jpg',
  'Clear': '/images/clear-sky.jpg',
  'Partly cloudy': '/images/partly-cloudy-sky.jpg',
  'Cloudy': '/images/cloudy-sky.jpg',
  'Overcast': '/images/cloudy-sky.jpg',
  'Mist': '/images/foggy-sky.jpg',
  'Freezing fog': '/images/foggy-sky.jpg',
  'Fog': '/images/foggy-sky.jpg',
  'Patchy rain possible': '/images/rainy-sky.jpg',
  'Patchy light drizzle': '/images/rainy-sky.jpg',
  'Light drizzle': '/images/rainy-sky.jpg',
  'Freezing drizzle': '/images/rainy-sky.jpg',
  'Heavy freezing drizzle': '/images/rainy-sky.jpg',
  'Patchy light rain': '/images/rainy-sky.jpg',
  'Light rain': '/images/rainy-sky.jpg',
  'Moderate rain at times': '/images/rainy-sky.jpg',
  'Moderate rain': '/images/rainy-sky.jpg',
  'Heavy rain at times': '/images/rainy-sky.jpg',
  'Heavy rain': '/images/rainy-sky.jpg',
  'Light freezing rain': '/images/rainy-sky.jpg',
  'Moderate or heavy freezing rain': '/images/rainy-sky.jpg',
  'Light rain shower': '/images/rainy-sky.jpg',
  'Torrential rain shower': '/images/rainy-sky.jpg',
  'Moderate or heavy rain shower': '/images/rainy-sky.jpg',
  'Patchy light rain with thunder': '/images/thunder-sky.jpg',
  'Moderate or heavy rain with thunder': '/images/thunder-sky.jpg',
  'Patchy light snow': '/images/snowy-sky.jpg',
  'Light snow': '/images/snowy-sky.jpg',
  'Patchy moderate snow': '/images/snowy-sky.jpg',
  'Moderate snow': '/images/snowy-sky.jpg',
  'Patchy heavy snow': '/images/snowy-sky.jpg',
  'Heavy snow': '/images/snowy-sky.jpg',
  'Ice pellets': '/images/snowy-sky.jpg',
  'Light snow showers': '/images/snowy-sky.jpg',
  'Moderate or heavy snow showers': '/images/snowy-sky.jpg',
  'Light showers of ice pellets': '/images/snowy-sky.jpg',
  'Moderate or heavy showers of ice pellets': '/images/snowy-sky.jpg',
  'Patchy light snow with thunder': '/images/thunder-sky.jpg',
  'Moderate or heavy snow with thunder': '/images/thunder-sky.jpg',
  'Patchy sleet possible': '/images/snowy-sky.jpg',
  'Light sleet': '/images/snowy-sky.jpg',
  'Moderate or heavy sleet': '/images/snowy-sky.jpg',
  'Light sleet showers': '/images/snowy-sky.jpg',
  'Moderate or heavy sleet showers': '/images/snowy-sky.jpg',
  'Blowing snow': '/images/snowy-sky.jpg',
  'Blizzard': '/images/blizzard-sky.jpg',
};

function WeatherApp() {
  const [location, setLocation] = useState('');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [forecastDays, setForecastDays] = useState(3);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (location) {
      getCurrentWeather(location)
        .then((data) => setCurrentWeather(data))
        .catch((error) => console.error('Ошибка при получении текущей погоды:', error));

      getForecast(location, forecastDays)
        .then((data) => setForecast(data))
        .catch((error) => console.error('Ошибка при получении прогноза:', error));
    }
  }, [location, forecastDays]);

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
    setSearchResults([]);
  };

  const handleLocationSearch = async (query) => {
    if (query) {
      const results = await searchLocations(query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleForecastDaysChange = (days) => {
    setForecastDays(days);
  };

  const handleLocationError = () => {
    console.error('Ошибка получения текущего местоположения');
  };

  useEffect(() => {
    getCurrentLocation()
      .then((position) => {
        const { latitude, longitude } = position.coords;
        setLocation(`${latitude},${longitude}`);
      })
      .catch(handleLocationError);
  }, []);

  return (
    <div
      className={styles.weatherApp}
      style={{
        backgroundImage: `url(${weatherBackgrounds[currentWeather?.current?.condition?.text] || '/images/default-sky.jpg'})`,
      }}
    >
      <h1 className={styles.title}>Погодное приложение</h1>
      <div className={styles.forecastDaysOptions}>
        <div
          className={`${styles.forecastDaysOption} ${forecastDays === 1 ? styles.active : ''}`}
          onClick={() => handleForecastDaysChange(1)}
        >
          Сегодня
        </div>
        <div
          className={`${styles.forecastDaysOption} ${forecastDays === 3 ? styles.active : ''}`}
          onClick={() => handleForecastDaysChange(3)}
        >
          3 дня
        </div>
        <div
          className={`${styles.forecastDaysOption} ${forecastDays === 5 ? styles.active : ''}`}
          onClick={() => handleForecastDaysChange(5)}
        >
          5 дней
        </div>
        <div
          className={`${styles.forecastDaysOption} ${forecastDays === 10 ? styles.active : ''}`}
          onClick={() => handleForecastDaysChange(10)}
        >
          10 дней
        </div>
      </div>
      <LocationInput
        onLocationChange={handleLocationChange}
        onLocationSearch={handleLocationSearch}
        searchResults={searchResults}
      />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} days={forecastDays} />}
    </div>
  );
}

export default WeatherApp;