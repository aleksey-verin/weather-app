import { IForecastWeatherNormalized, IForecastWeather } from '../types/forecastType';
import { IDataForStatistics } from '../types/otherTypes';
import { ICurrentWeather, ICurrentWeatherNormalized } from '../types/weatherType';

export const transformWeather = (data: ICurrentWeather): ICurrentWeatherNormalized => {
  return {
    cityName: data.name,
    feelsLike: convertKelvinToCelsius(data.main.feels_like),
    temp: convertKelvinToCelsius(data.main.temp),
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    sunrise: convertTimestampToTime(data.sys.sunrise, data.timezone),
    sunset: convertTimestampToTime(data.sys.sunset, data.timezone),
    timezone: data.timezone
  };
};

export const transformForecast = (dataForecast: IForecastWeather): IForecastWeatherNormalized[] => {
  return dataForecast.list;
};

export function convertKelvinToCelsius(kelvin: number): number {
  return +(kelvin - 273.15).toFixed(1);
}

export function convertTimestampToTime(unixTimestamp: number, timezone: number): string {
  const date = new Date((unixTimestamp + timezone) * 1000);
  const hours = '0' + date.getUTCHours();
  const minutes = '0' + date.getMinutes();
  return hours.slice(-2) + ':' + minutes.slice(-2);
}

export function convertTimestampToDayAndMonth(unixTimestamp: number, timezone: number): string {
  const date = new Date((unixTimestamp + timezone) * 1000);
  const day = date.getUTCDate();
  const monthNum = date.getUTCMonth();
  const monthObj: { [char: number]: string } = {
    0: 'января',
    1: 'февраля',
    2: 'марта',
    3: 'апреля',
    4: 'мая',
    5: 'июня',
    6: 'июля',
    7: 'августа',
    8: 'сентября',
    9: 'октября',
    10: 'ноября',
    11: 'декабря'
  };
  const month = monthObj[monthNum];
  return `${day} ${month}`;
}

export function translateWeather(weatherFromData: string): string {
  const weather: { [char: string]: string } = {
    Clouds: 'Облачно',
    Clear: 'Ясно',
    Snow: 'Снег',
    Thunderstorm: 'Гроза',
    Drizzle: 'Дождь',
    Rain: 'Дождь',
    Mist: 'Туман',
    Smoke: 'Смог',
    Haze: 'Туман',
    Dust: 'Пыль',
    Fog: 'Туман',
    Sand: 'Песок',
    Ash: 'Пепел',
    Squall: 'Ураган',
    Tornado: 'Торнадо'
  };
  return weather[weatherFromData];
}

export const countDataForTopOneCity = (list: IDataForStatistics[], city: string) => {
  const newList = JSON.parse(JSON.stringify(list));
  const myIndex = newList.findIndex((item: IDataForStatistics) => item.name === city);
  if (myIndex > -1) {
    newList[myIndex].count += 1;
  } else {
    newList.push({ name: city, count: 1 });
  }
  return newList;
};

export const findTopOneCity = (list: IDataForStatistics[]) => {
  if (!list.length) return;
  const cityName = list.reduce((acc, item) => {
    if (!acc || acc.count < item.count) {
      acc = item;
    }
    return acc;
  });
  return cityName;
};
