import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { addDataForRequestCounter, addDataForTopOneCity } from './store/reducers/statisticsSlice';
import { ROUTES } from './routes/routes';
import {
  getCurrentWeather,
  selectorCurrentWeatherSlice
} from './store/reducers/currentWeatherSlice';
import { getForecastWeather } from './store/reducers/forecastWeatherSlice';
import Navbar from './components/Navbar';
import Weather from './components/Weather';
import Stats from './components/Stats';
import Help from './components/Help';
import { useAppDispatch } from './store/store';
import './App.css';

const App = () => {
  const dispatch = useAppDispatch();
  const { currentCity, currentWeather } = useSelector(selectorCurrentWeatherSlice);

  useEffect(() => {
    dispatch(getCurrentWeather(currentCity));
    dispatch(getForecastWeather(currentCity));
  }, []);

  useEffect(() => {
    if (currentWeather) {
      dispatch(addDataForRequestCounter());
      dispatch(addDataForTopOneCity(currentCity));
    }
  }, [currentCity]);

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<Weather />} path={ROUTES.MAIN_ROUTE} />
          <Route element={<Stats />} path={ROUTES.STATS_ROUTE} />
          <Route element={<Help />} path={ROUTES.HELP_ROUTE} />
          <Route path="*" element={<Navigate replace to={ROUTES.MAIN_ROUTE} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
