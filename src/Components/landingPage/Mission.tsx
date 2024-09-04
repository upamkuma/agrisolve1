import React from 'react';

const Mission = () => {
  return (
    <section className="py-16 bg-green-300 relative overflow-hidden"> {/* Updated background color */}
      <div className="absolute inset-0 -z-10">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="5" fill="#ffffff" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pattern)" />
        </svg>
      </div>
      <div className="max-w-4xl mx-auto flex items-center relative z-10"> {/* Centered content */}
        <img 
          src="https://th.bing.com/th/id/OIP.X6g35P8BzTsvKNE1Sf2dyQHaEe?w=294&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" 
          alt="Mission" 
          className="w-1/2 h-auto rounded-lg shadow-lg"
        />
        <div className="ml-8">
          <h2 className="text-3xl font-bold text-green-900">Our Mission</h2>
          <p className="mt-4 text-gray-700">
            Promote sustainable farming practices that protect the environment and conserve natural resources.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Mission;
