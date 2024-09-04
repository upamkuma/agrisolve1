import React from 'react';

const HeroImage = () => {
  return (
    <div className="w-1/3 h-80 bg-white rounded-3xl transform rotate-6">
        <img 
        src="src\assets\image1.jpg" 
        alt="Hero image description" 
        className="w-full h-full object-cover rounded-3xl"
      />
    </div>
  );
};

export default HeroImage;