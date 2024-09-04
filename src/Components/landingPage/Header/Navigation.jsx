import React from 'react';

const Navigation = () => {
  return (
    <nav>
      <ul className="flex space-x-4">
        {['about', 'products', 'pricing', 'post', 'contact us'].map((link, index) => (
          <li key={index}>
            <a href="#" className="text-gray-400 hover:text-black">{link}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;