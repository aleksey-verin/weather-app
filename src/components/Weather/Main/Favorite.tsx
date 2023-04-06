import { useSelector } from 'react-redux';
import {
  clearAllFavoriteCities,
  deleteFromFavoriteCities,
  selectorFavoriteCities
} from '../../../store/reducers/favoriteCitiesSlice';
import {
  getCurrentWeather,
  selectorCurrentWeatherSlice
} from '../../../store/reducers/currentWeatherSlice';
import { getForecastWeather } from '../../../store/reducers/forecastWeatherSlice';
import { useAppDispatch } from '../../../store/store';

const Favorite = () => {
  const dispatch = useAppDispatch();
  const { currentCity } = useSelector(selectorCurrentWeatherSlice);
  const { favoriteCities } = useSelector(selectorFavoriteCities);

  const showFromFavorite = (city: string) => {
    if (city !== currentCity) {
      dispatch(getCurrentWeather(city));
      dispatch(getForecastWeather(city));
    }
  };

  const deleteCity = (city: string) => {
    dispatch(deleteFromFavoriteCities(city));
  };

  const handleClearFavoriteCities = () => {
    dispatch(clearAllFavoriteCities());
  };

  return (
    <div className="section-favorite">
      <div className="favorite-title-block">Избранные города:</div>
      <div className="favorite-list-block">
        <div className="list-cities">
          {favoriteCities.map((item: string) => {
            return (
              <div key={item} className="list-item">
                <div onClick={() => showFromFavorite(item)} className="list-item_name">
                  {item}
                </div>
                <div onClick={() => deleteCity(item)} className="list-item_btn">
                  <span>&#215;</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div onClick={handleClearFavoriteCities} className="button-clear">
        Очистить всё
      </div>
    </div>
  );
};

export default Favorite;
