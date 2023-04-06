import React from 'react';
import Favorite from './Main/Favorite';
import Tabs from './Main/Tabs';

const Main = () => {
  return (
    <div className="section-main">
      <Tabs />
      <Favorite />
    </div>
  );
};

export default Main;
