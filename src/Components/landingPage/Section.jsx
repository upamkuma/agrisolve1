import React from 'react';

const partners = [
  { name: 'Astrom', logo: '🟣' },
  { name: 'cicio', logo: '🔵🟠' },
  { name: 'weavy', logo: '〰️' },
  { name: 'vRokets', logo: '🦄' },
  { name: 'viewio', logo: '👀' },
  { name: 'Metablu', logo: '🔶' },
  { name: 'Buildaa', logo: '⬛⚪⚪' },
  { name: 'hapi', logo: '😊' },
  { name: 'LOGO IPSUM', logo: '🔤' },
  { name: 'virtuo', logo: '🟣' },
];

const Section = () => {
  return (
    <div className="bg-green-300 py-16 px-8">
      <h2 className="text-4xl font-bold text-green-800 text-center mb-12">Our Top Partners</h2>
      <div className="grid grid-cols-5 gap-8">
        {partners.map((partner, index) => (
          <div key={index} className="flex items-center justify-center">
            <div className="flex flex-col items-center">
              <span className="text-3xl mb-2">{partner.logo}</span>
              <span className="text-sm font-semibold text-green-700">{partner.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section;