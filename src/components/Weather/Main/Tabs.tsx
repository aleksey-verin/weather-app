import React, { useState } from 'react';
import BlockDetails from './Tabs/BlockDetails';
import BlockForecast from './Tabs/BlockForecast';
import BlockNowNew from './Tabs/BlockNowNew';

const Tabs = () => {
  const tabs = {
    now: 'now',
    details: 'details',
    forecast: 'forecast'
  };

  const [activeTab, setActiveTab] = useState(tabs.now);

  return (
    <div className="section-tabs">
      <div className="block-tabs">
        <div className={`tab-content ${activeTab === tabs.now ? 'active' : ''}`}>
          <BlockNowNew />
        </div>
        <div className={`tab-content ${activeTab === tabs.details ? 'active' : ''}`}>
          <BlockDetails />
        </div>
        <div className={`tab-content ${activeTab === tabs.forecast ? 'active' : ''}`}>
          <BlockForecast />
        </div>
      </div>
      <div className="block-links">
        <button
          onClick={() => (activeTab !== tabs.now ? setActiveTab(tabs.now) : null)}
          className={`tab-links ${activeTab === tabs.now ? 'active' : ''}`}>
          Сейчас
        </button>
        <button
          onClick={() => (activeTab !== tabs.details ? setActiveTab(tabs.details) : null)}
          className={`tab-links ${activeTab === tabs.details ? 'active' : ''}`}>
          Детали
        </button>
        <button
          onClick={() => (activeTab !== tabs.forecast ? setActiveTab(tabs.forecast) : null)}
          className={`tab-links ${activeTab === tabs.forecast ? 'active' : ''}`}>
          Прогноз
        </button>
      </div>
    </div>
  );
};

export default Tabs;
