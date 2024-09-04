import React from 'react';

const FooterSection = ({ title, links }) => {
  return (
    <div>
      <h3 className="font-bold text-lg mb-4">{title}</h3>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <a href="#" className="text-sm hover:underline">{link}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterSection;
