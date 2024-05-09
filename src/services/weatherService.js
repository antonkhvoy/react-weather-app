import axios from 'axios';
import { API_KEY, API_BASE_URL } from '../utils/api';

export async function getCurrentWeather(location) {
  const response = await axios.get(`${API_BASE_URL}/current.json`, {
    params: {
      key: API_KEY,
      q: location,
    },
  });
  return response.data;
}

export async function getForecast(location, days) {
  const response = await axios.get(`${API_BASE_URL}/forecast.json`, {
    params: {
      key: API_KEY,
      q: location,
      days: days,
    },
  });
  return response.data;
}

export async function searchLocations(query) {
  const response = await axios.get(`${API_BASE_URL}/search.json`, {
    params: {
      key: API_KEY,
      q: query,
    },
  });
  return response.data;
}