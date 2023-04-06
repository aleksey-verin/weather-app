import React from 'react';
import { useSelector } from 'react-redux';
import { selectorStatistics } from '../store/reducers/statisticsSlice';

const Stats = () => {
  const { requestCounter, topOneCity } = useSelector(selectorStatistics);

  if (!requestCounter || !topOneCity) return null;

  const lastDigitTop = Number(topOneCity.count.toString().slice(-1));
  const wordEndingTop = lastDigitTop >= 2 && lastDigitTop <= 4 ? 'а' : '';
  const lastDigitCount = Number(requestCounter.toString().slice(-1));
  const wordEndingCount = lastDigitCount >= 2 && lastDigitCount <= 4 ? 'а' : '';

  return (
    <div className="container" style={{ fontSize: 20, padding: 10 }}>
      <div style={{ marginBottom: 10, textAlign: 'center' }}>Самый часто запрашиваемый город:</div>
      <div style={{ color: 'purple', marginBottom: 10, textAlign: 'center' }}>
        {topOneCity.name && topOneCity.count
          ? ` ${topOneCity.name} (${topOneCity.count} раз${wordEndingTop})`
          : ' Нет данных'}
      </div>
      <div style={{ marginBottom: 10, textAlign: 'center' }}>Сколько раз Вы меняли города: </div>
      <div
        style={{
          color: 'purple',
          textAlign: 'center'
        }}>{`${requestCounter} раз${wordEndingCount}`}</div>
    </div>
  );
};

export default Stats;
