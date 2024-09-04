import React from 'react';

import Button from '../../Buttons/Button';

const HeroContent = () => {
  return (
    <div className="max-w-xl">
      <h1 className="text-6xl font-bold mb-4">Revolutionizing Agriculture with Smarter Contracts, AI and Community</h1>
      <p className="text-gray-400 mb-8 text-lg">Our platform connects you with reliable buyers, provides AI-powered farming insights, and offers a thriving community for shared growth and success.</p>
      <Button color = "primary" to = "SignIn">Join Kisan</Button>
    </div>
  );
};

export default HeroContent;