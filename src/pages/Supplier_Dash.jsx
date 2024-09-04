import React, { useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropTypes from 'prop-types';
import { MdLocationOn } from 'react-icons/md';
import YearMonthPicker from '../Components/Supplier_Dash/YearMonthPicker';

function Supplier_Dash() {
  const [selectedQuality, setSelectedQuality] = useState('Common');
  const [selectedLocation, setSelectedLocation] = useState('');

  const contracts = [
    { id: 1, name: 'Wheat', acquired: 50, total: 6000, acquiredQty: 3000, monthsLeft: 14, approved: 16, rejected: 8, pending: 15 },
    { id: 2, name: 'Paddy', acquired: 70, total: 4000, acquiredQty: 2800, monthsLeft: 10, approved: 20, rejected: 5, pending: 10 },
    { id: 3, name: 'Bajra', acquired: 30, total: 5000, acquiredQty: 1500, monthsLeft: 20, approved: 10, rejected: 3, pending: 7 },
    { id: 4, name: 'Cotton', acquired: 60, total: 7000, acquiredQty: 4200, monthsLeft: 18, approved: 18, rejected: 6, pending: 12 },
  ];

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  };

  return (
    <div className="bg-green-100 p-10 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8 bg-green-200 rounded-t-lg">
          <h2 className="text-2xl font-bold">Applications</h2>
          <div className="mt-4 p-6 bg-green-300 rounded-lg flex justify-between items-center">
            <div>
              <p className="font-semibold text-xl">XYZ applied for JAN 2025 Wheat Order</p>
              <p className="text-lg">10 QUINTALS @ ₹2850</p>
            </div>
            <div className="flex space-x-4">
              <button className="bg-green-500 text-white rounded-full px-6 py-3 text-lg">Approve</button>
              <button className="bg-red-500 text-white rounded-full px-6 py-3 text-lg">Reject</button>
              <button className="bg-blue-500 text-white rounded-full px-6 py-3 text-lg">Negotiate</button>
            </div>
          </div>
        </div>

        <div className="p-8 bg-white">
          <h2 className="text-2xl font-bold">Your Contracts</h2>
          <div className="mt-4 pb-4">
            <Slider {...settings}>
              {contracts.map(contract => (
                <div key={contract.id} className="px-2">
                  <div className="bg-green-300 rounded-lg p-6 shadow-md hover:shadow-lg transform transition duration-300 ease-in-out hover:scale-105">
                    <p className="font-semibold text-xl mb-2">{contract.name}</p>
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-sm text-gray-700">Acquired: {contract.acquired}%</p>
                      <p className="text-sm text-gray-700">{contract.monthsLeft} Months left</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-inner">
                      <p className="font-medium text-lg text-gray-800">{contract.acquiredQty} of {contract.total} Quintals</p>
                      <div className="mt-2 flex justify-between text-sm text-gray-600">
                        <span>{contract.approved} Approved</span>
                        <span>{contract.rejected} Rejected</span>
                        <span>{contract.pending} Pending</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>

        <div className="p-8 bg-green-200 rounded-b-lg">
          <h2 className="text-2xl font-bold">New Contract</h2>
          
          {/* Raw Material Selection */}
          <div className="mt-4 flex items-center">
            <h3 className="text-xl font-semibold w-40">Raw Material</h3>
            <select className="w-full p-4 border rounded text-lg">
              <option>Wheat</option>
              <option>Paddy</option>
              <option>Bajra</option>
              <option>Cotton</option>
            </select>
          </div>

          {/* Quality Selection */}
          <div className="mt-6 flex items-center">
            <h3 className="text-xl font-semibold w-40">Quality</h3>
            <div className="flex space-x-4">
              <button
                className={`px-6 py-3 rounded text-lg ${selectedQuality === 'High' ? 'bg-green-500 text-white' : 'bg-white border'}`}
                onClick={() => setSelectedQuality('High')}
              >
                High
              </button>
              <button
                className={`px-6 py-3 rounded text-lg ${selectedQuality === 'Common' ? 'bg-green-500 text-white' : 'bg-white border'}`}
                onClick={() => setSelectedQuality('Common')}
              >
                Common
              </button>
              <button
                className={`px-6 py-3 rounded text-lg ${selectedQuality === 'Budget' ? 'bg-green-500 text-white' : 'bg-white border'}`}
                onClick={() => setSelectedQuality('Budget')}
              >
                Budget
              </button>
            </div>
          </div>

          {/* Quantity Input */}
          <div className="mt-6 flex items-center">
            <h3 className="text-xl font-semibold w-40">Quantity</h3>
            <input className="w-full p-4 border rounded text-lg" type="text" placeholder="Min 100 Quintal" />
          </div>

          {/* Price Input */}
          <div className="mt-6 flex items-center">
            <h3 className="text-xl font-semibold w-40">Price</h3>
            <input className="w-full p-4 border rounded text-lg" type="text" placeholder="Min ₹2700 / Quintal" />
          </div>

          {/* Location Input */}
          <div className="mt-6 flex items-center">
            <h3 className="text-xl font-semibold w-40">Location</h3>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MdLocationOn className="w-5 h-5 text-gray-500" />
              </div>
              <input
                className="w-full pl-10 p-4 border rounded-full text-lg"
                type="text"
                placeholder="Enter Location"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-6 flex items-center">
            <h3 className="text-xl font-semibold w-40">Time</h3>
            <YearMonthPicker/>
          </div>

          <div className="mt-6">
            <button className="bg-green-500 text-white w-full rounded-full py-3 text-lg">POST</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600`}
      style={{ ...style, display: "block", right: "-25px", zIndex: 1 }}
      onClick={onClick}
    />
  );
}

SampleNextArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func.isRequired,
};

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600`}
      style={{ ...style, display: "block", left: "-25px", zIndex: 1 }}
      onClick={onClick}
    />
  );
}

SamplePrevArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func.isRequired,
};

export default Supplier_Dash;
