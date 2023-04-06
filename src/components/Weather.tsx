import React from 'react';
import Main from './Weather/Main';
import Search from './Weather/Search';

const Weather = () => {
  return (
    <div className="container">
      <Search />
      <Main />
    </div>
  );
};

export default Weather;
