import { useState } from 'react';
import styles from './LocationInput.module.css';

function LocationInput({ onLocationChange, onLocationSearch, searchResults }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    onLocationSearch(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onLocationChange(inputValue);
    setInputValue('');
  };

  const handleLocationSelect = (location) => {
    onLocationChange(location);
    setInputValue('');
  };

  return (
    <div className={styles.topContainer}>
      <div className={styles.locationInputContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Введите город..."
            className={styles.input}
          />
        </form>
        {searchResults.length > 0 && (
          <ul className={styles.searchResults}>
            {searchResults.map((result) => (
              <li
                key={result.id}
                className={styles.searchResult}
                onClick={() => handleLocationSelect(result.name)}
              >
                {result.name}, {result.country}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default LocationInput;