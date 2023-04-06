import React from 'react';
import { useSelector } from 'react-redux';
import ItemForecast from './ItemForecast';
import { selectorCurrentWeatherSlice } from '../../../../store/reducers/currentWeatherSlice';
import { selectorForecastWeatherSlice } from '../../../../store/reducers/forecastWeatherSlice';

const BlockForecast = () => {
  const { forecastWeather, isLoading, isError } = useSelector(selectorForecastWeatherSlice);
  const { currentWeather } = useSelector(selectorCurrentWeatherSlice);

  if (isLoading) {
    return <div className="message-tab">Идет загрузка..</div>;
  }
  if (isError) {
    return <div className="message-tab">Ошибка при загрузке</div>;
  }

  if (!currentWeather || !forecastWeather) return null;
  const { cityName, timezone } = currentWeather;

  return (
    <div className="tab-forecast">
      <div className="forecast-city-name">{cityName}</div>
      <div className="forecast-list">
        {forecastWeather.length
          ? forecastWeather.map((item, index) => (
              <ItemForecast
                key={index}
                date={item.dt}
                timezone={timezone}
                tempReal={item.main.temp}
                tempFeels={item.main.feels_like}
                text={item.weather[0].main}
                pic={item.weather[0].icon}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default BlockForecast;
