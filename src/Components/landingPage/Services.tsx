import React from 'react';
import { FaSeedling, FaTractor, FaHandsHelping } from 'react-icons/fa';

const Services = () => {
  return (
    <section className="py-16 bg-[#D6EFD8]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl text-center font-bold text-orange-500 mb-8">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Service 1 */}
          <div className="bg-white p-8 shadow-lg rounded-lg transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-center mb-4">
              <FaSeedling className="text-green-600 text-6xl" />
            </div>
            <h3 className="text-xl font-semibold text-center text-green-900 mb-2">
              MarketPlace
            </h3>
            <p className="text-center text-gray-700">
              Our services provide access to AI-driven data for efficient and eco-friendly farming practices, improving yield and reducing waste.
            </p>
          </div>

          {/* Service 2 */}
          <div className="bg-white p-8 shadow-lg rounded-lg transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-center mb-4">
              <FaTractor className="text-green-600 text-6xl" />
            </div>
            <h3 className="text-xl font-semibold text-center text-green-900 mb-2">
              AI Assistance
            </h3>
            <p className="text-center text-gray-700">
              Equip your farm with the latest smart tractors and tools that work seamlessly with AI to optimize your farming operations.
            </p>
          </div>

          {/* Service 3 */}
          <div className="bg-white p-8 shadow-lg rounded-lg transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-center mb-4">
              <FaHandsHelping className="text-green-600 text-6xl" />
            </div>
            <h3 className="text-xl font-semibold text-center text-green-900 mb-2">
              Community Support
            </h3>
            <p className="text-center text-gray-700">
              Join a community of farmers and experts to share knowledge, resources, and support for a sustainable future.
            </p>
          </div>
        </div>
      </div>
      <div className="my-10 text-center"> {/* Reduced margin and centered */}
        <h3 className="text-2xl font-semibold text-black mb-4">
          We provide great services for our customers based on needs
        </h3>
        <hr className="border-t-2 border-gray-300 mx-12" /> {/* Increased horizontal padding */}
      </div>
    </section>
  );
};

export default Services;
