import React from 'react';
import { useSelector } from 'react-redux';
import { selectorStatistics } from '../store/reducers/statisticsSlice';

const Stats = () => {
  const { requestCounter, topOneCity } = useSelector(selectorStatistics);

  const topCityName = topOneCity ? topOneCity.name : '';
  const topCityCount = topOneCity ? topOneCity.count : '';

  return (
    <div className="container" style={{ fontSize: 20, padding: 10 }}>
      <div style={{ marginBottom: 10, textAlign: 'center' }}>Самый часто запрашиваемый город:</div>
      <div style={{ color: 'purple', marginBottom: 10, textAlign: 'center' }}>
        {topCityName && topCityCount
          ? `город: ${topCityName}; количество запросов: ${topCityCount}`
          : ' Нет данных'}
      </div>
      <div style={{ marginBottom: 10, textAlign: 'center' }}>Сколько раз Вы меняли города: </div>
      <div
        style={{
          color: 'purple',
          textAlign: 'center'
        }}>{`количество запросов: ${requestCounter}`}</div>
    </div>
  );
};

export default Stats;
