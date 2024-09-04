import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ children, color = 'primary', to }) => {
  const colorClasses = {
    primary: 'bg-[#508D4E] text-white',
    yellow: 'bg-yellow-400 text-black',
  };

  const selectedColorClass = colorClasses[color] || colorClasses['primary'];

  if (to) {
    return (
      <Link to={to} className={`${selectedColorClass} px-6 py-3 rounded-full`}>
        {children}
      </Link>
    );
  }

  return (
    <button className={`${selectedColorClass} px-6 py-3 rounded-full`}>
      {children}
    </button>
  );
};

export default Button;
