/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToFavoriteCities,
  deleteFromFavoriteCities,
  selectorFavoriteCities
} from '../../../../store/reducers/favoriteCitiesSlice';
import ImgHeart from '../../../Images/ImgHeart';
import { selectorCurrentWeatherSlice } from '../../../../store/reducers/currentWeatherSlice';
import { createUrlImage, urlImageSizes } from '../../../../utils/api-helpers';

const BlockNowNew = () => {
  const dispatch = useDispatch();

  const { currentWeather, isLoading, isError } = useSelector(selectorCurrentWeatherSlice);
  const { favoriteCities } = useSelector(selectorFavoriteCities);

  if (isLoading) {
    return <div className="message-tab">Идет загрузка..</div>;
  }
  if (isError) {
    return <div className="message-tab">Ошибка при загрузке</div>;
  }

  if (!currentWeather) return null;
  const { cityName, temp, icon } = currentWeather;

  const getFavoriteCities = (city: string): void => {
    if (favoriteCities.includes(city)) {
      dispatch(deleteFromFavoriteCities(city));
    } else {
      dispatch(addToFavoriteCities(city));
    }
  };

  return (
    <div className="tab-now">
      <div className="now-temperature">
        <span className="current-temp">{temp}</span>
        <span>&#8451;</span>
      </div>
      <div className="now-sky">
        {icon && <img className="picture-weather" src={createUrlImage(icon, urlImageSizes.four)} />}
      </div>
      <div className="now-city">
        <div className="now-city-name">{cityName}</div>
        <div
          onClick={() => getFavoriteCities(cityName)}
          className={`favorite-button ${favoriteCities.includes(cityName) ? 'checked' : ''}`}>
          <ImgHeart />
        </div>
      </div>
    </div>
  );
};

export default BlockNowNew;
