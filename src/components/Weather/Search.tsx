import React, { ChangeEvent, useState } from 'react';
import ImgSearch from '../Images/ImgSearch';
import { useSelector } from 'react-redux';
import {
  getCurrentWeather,
  selectorCurrentWeatherSlice
} from '../../store/reducers/currentWeatherSlice';
import { getForecastWeather } from '../../store/reducers/forecastWeatherSlice';
import { useAppDispatch } from '../../store/store';

const defaultInputValue = '';

const Search = () => {
  const dispatch = useAppDispatch();
  const { currentCity } = useSelector(selectorCurrentWeatherSlice);

  const [inputValue, setInputValue] = useState(defaultInputValue);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const city = inputValue.trim();
    if (city.length < 3) {
      return;
    }
    if (city.toLowerCase() === currentCity.toLowerCase()) {
      return;
    }
    dispatch(getCurrentWeather(inputValue));
    dispatch(getForecastWeather(inputValue));

    setInputValue(defaultInputValue);
  };

  return (
    <div className="section-search">
      <form onSubmit={handleSubmit} className="form-search" action="#">
        <input
          onChange={handleInput}
          className="input-search"
          type="text"
          placeholder="Введите название города.."
          value={inputValue}
        />
        <button type="submit" className="button-search">
          <ImgSearch />
        </button>
      </form>
    </div>
  );
};

export default Search;
