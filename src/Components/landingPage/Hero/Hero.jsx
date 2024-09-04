import React from 'react';
import HeroContent from './HeroContent';
import HeroImage from './HeroImage';

const Hero = () => {
  return (
    <main className="flex justify-between items-center px-16 py-24">
      <HeroContent />
      <HeroImage />
    </main>
  );
};

export default Hero;