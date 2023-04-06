/* eslint-disable react/prop-types */
import React from 'react';
import {
  convertKelvinToCelsius,
  convertTimestampToDayAndMonth,
  convertTimestampToTime,
  translateWeather
} from '../../../../utils/helpers';
import { createUrlImage, urlImageSizes } from '../../../../utils/api-helpers';

interface ItemForecastTypes {
  date: number;
  timezone: number;
  tempReal: number;
  tempFeels: number;
  text: string;
  pic: string;
}

const ItemForecast = ({
  date,
  timezone,
  tempReal,
  tempFeels,
  text,
  pic: icon
}: ItemForecastTypes) => {
  return (
    <div className="forecast-item">
      <div className="date-time">
        <div className="date">{convertTimestampToDayAndMonth(date, timezone)}</div>
        <div className="time">{convertTimestampToTime(date, timezone)}</div>
      </div>
      <div className="weather">
        <div className="temper">
          <div className="real-temp">
            Температура: {convertKelvinToCelsius(tempReal)}
            <span>&#8451;</span>
          </div>
          <div className="feels-temp">
            Ощущается как: {convertKelvinToCelsius(tempFeels)}
            <span>&#8451;</span>
          </div>
        </div>
        <div className="sky">
          <div className="sky-text">{translateWeather(text)}</div>
          <img className="sky-pic" src={createUrlImage(icon, urlImageSizes.two)}></img>
        </div>
      </div>
    </div>
  );
};

export default ItemForecast;
