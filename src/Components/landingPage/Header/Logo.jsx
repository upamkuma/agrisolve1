import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center space-x-4">
      <div className="w-8 h-8 bg-white rounded-full"></div>
      <div className="w-32 h-8 bg-gray-800 rounded-full text-white flex items-center justify-center">
        <p>Agri-Solve</p>
      </div>
    </div>
  );
};

export default Logo;