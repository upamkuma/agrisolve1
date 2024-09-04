import React, { useState } from 'react';

const PillNav = () => {
  const [activeTab, setActiveTab] = useState('Home');

  const tabs = ['Fertilizers', 'Seeds', 'Equipments', 'Organic'];

  return (
    <div className="bg-dark-green p-4">
      <nav className="flex justify-center space-x-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-full text-white font-medium focus:outline-none ${
              activeTab === tab ? 'bg-darker-green text-medium-green-700' : 'bg-medium-green hover:bg-light-green'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default PillNav;
