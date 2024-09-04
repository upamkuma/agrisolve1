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
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [uid, setUid] = useState(''); // Set UID from Signin.jsx here
  const [selectedDate, setSelectedDate] = useState(''); // Using useState for date

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
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    const rawMaterial = document.querySelector('select[name="rawMaterial"]').value;
    const requiredQuantity = quantity;
    const priceValue = price;
    const locationValue = selectedLocation;
    const date = selectedDate; // Use selectedDate from state

    try {
      const response = await fetch('/createContract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product: rawMaterial,
          quality: selectedQuality,
          required_quantity: requiredQuantity,
          price: priceValue,
          location: locationValue,
          date: date,
          buyerID: uid, // Send the UID here
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Contract created successfully!');
        // Optionally reset form fields here
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create contract');
    }
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
            <select name="rawMaterial" className="w-full p-4 border rounded text-lg">
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

          {/* Location */}
          <div className="mt-6 flex items-center">
            <h3 className="text-xl font-semibold w-40">Location</h3>
            <input
              type="text"
              name="location"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full p-4 border rounded text-lg"
            />
          </div>

          {/* Quantity */}
          <div className="mt-6 flex items-center">
            <h3 className="text-xl font-semibold w-40">Quantity</h3>
            <input
              type="number"
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full p-4 border rounded text-lg"
            />
          </div>

          {/* Price */}
          <div className="mt-6 flex items-center">
            <h3 className="text-xl font-semibold w-40">Price</h3>
            <input
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-4 border rounded text-lg"
            />
          </div>

          {/* Date Picker */}
          <div className="mt-6 flex items-center">
            <h3 className="text-xl font-semibold w-40">Date</h3>
            <YearMonthPicker
              value={selectedDate}
              onChange={(date) => setSelectedDate(date)} // Capture selected date
            />
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-end">
            <button onClick={handleSubmit} className="bg-green-500 text-white rounded-full px-6 py-3 text-lg">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style, display: 'block', background: 'green' }} onClick={onClick} />;
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style, display: 'block', background: 'green' }} onClick={onClick} />;
}

Supplier_Dash.propTypes = {
  rawMaterial: PropTypes.string,
  acquired: PropTypes.number,
  total: PropTypes.number,
  acquiredQty: PropTypes.number,
  monthsLeft: PropTypes.number,
  approved: PropTypes.number,
  rejected: PropTypes.number,
  pending: PropTypes.number,
};

export default Supplier_Dash;

// import React, { useState } from 'react';
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import PropTypes from 'prop-types';
// import { MdLocationOn } from 'react-icons/md';
// import YearMonthPicker from '../Components/Supplier_Dash/YearMonthPicker';

// function Supplier_Dash() {
//   const [selectedQuality, setSelectedQuality] = useState('Common');
//   const [selectedLocation, setSelectedLocation] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [price, setPrice] = useState('');
//   const [uid, setUid] = useState(''); // Set UID from Signin.jsx here

//   const contracts = [
//     { id: 1, name: 'Wheat', acquired: 50, total: 6000, acquiredQty: 3000, monthsLeft: 14, approved: 16, rejected: 8, pending: 15 },
//     { id: 2, name: 'Paddy', acquired: 70, total: 4000, acquiredQty: 2800, monthsLeft: 10, approved: 20, rejected: 5, pending: 10 },
//     { id: 3, name: 'Bajra', acquired: 30, total: 5000, acquiredQty: 1500, monthsLeft: 20, approved: 10, rejected: 3, pending: 7 },
//     { id: 4, name: 'Cotton', acquired: 60, total: 7000, acquiredQty: 4200, monthsLeft: 18, approved: 18, rejected: 6, pending: 12 },
//   ];

//   const settings = {
//     dots: false,
//     infinite: false,  
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     nextArrow: <SampleNextArrow />,
//     prevArrow: <SamplePrevArrow />,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: true,
//         },
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           initialSlide: 1,
//         },
//       },
//     ],
//   };
  
//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const rawMaterial = document.querySelector('select[name="rawMaterial"]').value;
//     const requiredQuantity = quantity;
//     const priceValue = price;
//     const locationValue = selectedLocation;
//     const date = document.querySelector('input[name="date"]').value;

//     try {
//       const response = await fetch('/createContract', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           product: rawMaterial,
//           quality: selectedQuality,
//           required_quantity: requiredQuantity,
//           price: priceValue,
//           location: locationValue,
//           date: date,
//           buyerID: uid, // Send the UID here
//         }),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         alert('Contract created successfully!');
//         // Optionally reset form fields here
//       } else {
//         alert(`Error: ${result.error}`);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Failed to create contract');
//     }
//   };

//   return (
//     <div className="bg-green-100 p-10 min-h-screen flex justify-center items-center">
//       <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
//         <div className="p-8 bg-green-200 rounded-t-lg">
//           <h2 className="text-2xl font-bold">Applications</h2>
//           <div className="mt-4 p-6 bg-green-300 rounded-lg flex justify-between items-center">
//             <div>
//               <p className="font-semibold text-xl">XYZ applied for JAN 2025 Wheat Order</p>
//               <p className="text-lg">10 QUINTALS @ ₹2850</p>
//             </div>
//             <div className="flex space-x-4">
//               <button className="bg-green-500 text-white rounded-full px-6 py-3 text-lg">Approve</button>
//               <button className="bg-red-500 text-white rounded-full px-6 py-3 text-lg">Reject</button>
//               <button className="bg-blue-500 text-white rounded-full px-6 py-3 text-lg">Negotiate</button>
//             </div>
//           </div>
//         </div>

//         <div className="p-8 bg-white">
//           <h2 className="text-2xl font-bold">Your Contracts</h2>
//           <div className="mt-4 pb-4">
//             <Slider {...settings}>
//               {contracts.map(contract => (
//                 <div key={contract.id} className="px-2">
//                   <div className="bg-green-300 rounded-lg p-6 shadow-md hover:shadow-lg transform transition duration-300 ease-in-out hover:scale-105">
//                     <p className="font-semibold text-xl mb-2">{contract.name}</p>
//                     <div className="flex justify-between items-center mb-4">
//                       <p className="text-sm text-gray-700">Acquired: {contract.acquired}%</p>
//                       <p className="text-sm text-gray-700">{contract.monthsLeft} Months left</p>
//                     </div>
//                     <div className="bg-white p-4 rounded-lg shadow-inner">
//                       <p className="font-medium text-lg text-gray-800">{contract.acquiredQty} of {contract.total} Quintals</p>
//                       <div className="mt-2 flex justify-between text-sm text-gray-600">
//                         <span>{contract.approved} Approved</span>
//                         <span>{contract.rejected} Rejected</span>
//                         <span>{contract.pending} Pending</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </Slider>
//           </div>
//         </div>

//         <div className="p-8 bg-green-200 rounded-b-lg">
//           <h2 className="text-2xl font-bold">New Contract</h2>

//           {/* Raw Material Selection */}
//           <div className="mt-4 flex items-center">
//             <h3 className="text-xl font-semibold w-40">Raw Material</h3>
//             <select name="rawMaterial" className="w-full p-4 border rounded text-lg">
//               <option>Wheat</option>
//               <option>Paddy</option>
//               <option>Bajra</option>
//               <option>Cotton</option>
//             </select>
//           </div>

//           {/* Quality Selection */}
//           <div className="mt-6 flex items-center">
//             <h3 className="text-xl font-semibold w-40">Quality</h3>
//             <div className="flex space-x-4">
//               <button
//                 className={`px-6 py-3 rounded text-lg ${selectedQuality === 'High' ? 'bg-green-500 text-white' : 'bg-white border'}`}
//                 onClick={() => setSelectedQuality('High')}
//               >
//                 High
//               </button>
//               <button
//                 className={`px-6 py-3 rounded text-lg ${selectedQuality === 'Common' ? 'bg-green-500 text-white' : 'bg-white border'}`}
//                 onClick={() => setSelectedQuality('Common')}
//               >
//                 Common
//               </button>
//               <button
//                 className={`px-6 py-3 rounded text-lg ${selectedQuality === 'Budget' ? 'bg-green-500 text-white' : 'bg-white border'}`}
//                 onClick={() => setSelectedQuality('Budget')}
//               >
//                 Budget
//               </button>
//             </div>
//           </div>

//           {/* Location */}
//           <div className="mt-6 flex items-center">
//             <h3 className="text-xl font-semibold w-40">Location</h3>
//             <input
//               type="text"
//               name="location"
//               value={selectedLocation}
//               onChange={(e) => setSelectedLocation(e.target.value)}
//               className="w-full p-4 border rounded text-lg"
//             />
//           </div>

//           {/* Quantity */}
//           <div className="mt-6 flex items-center">
//             <h3 className="text-xl font-semibold w-40">Quantity</h3>
//             <input
//               type="number"
//               name="quantity"
//               value={quantity}
//               onChange={(e) => setQuantity(e.target.value)}
//               className="w-full p-4 border rounded text-lg"
//             />
//           </div>

//           {/* Price */}
//           <div className="mt-6 flex items-center">
//             <h3 className="text-xl font-semibold w-40">Price</h3>
//             <input
//               type="number"
//               name="price"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               className="w-full p-4 border rounded text-lg"
//             />
//           </div>

//           {/* Date Picker */}
//           <div className="mt-6">
//             <YearMonthPicker />
//           </div>

//           {/* Submit Button */}
//           <div className="mt-6 flex justify-center">
//             <button
//               onClick={handleSubmit}
//               className="bg-green-500 text-white px-6 py-3 rounded-lg text-xl"
//             >
//               Create Contract
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// // Define SampleNextArrow and SamplePrevArrow
// function SampleNextArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: 'block', background: 'green' }}
//       onClick={onClick}
//     />
//   );
// }

// function SamplePrevArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: 'block', background: 'green' }}
//       onClick={onClick}
//     />
//   );
// }

// Supplier_Dash.propTypes = {
//   uid: PropTypes.string,
// };

// export default Supplier_Dash;

// import React, { useState } from 'react';
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import PropTypes from 'prop-types';
// import { MdLocationOn } from 'react-icons/md';
// import YearMonthPicker from '../Components/Supplier_Dash/YearMonthPicker';
// import axios from 'axios';

// function Supplier_Dash() {
//   const [selectedQuality, setSelectedQuality] = useState('Common');
//   const [selectedLocation, setSelectedLocation] = useState('');
//   const [rawMaterial, setRawMaterial] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [price, setPrice] = useState('');
//   const [uid, setUid] = useState(''); // Set UID here
//   const [date, setDate] = useState(new Date()); // Add state for date if needed

//   const contracts = [
//     // Contracts data here
//   ];

//   const settings = {
//     // Slider settings here
//   };

//   const handleSubmit = async () => {
//     try {
//       const response = await axios.post('http://localhost:4000/createContract', {
//         product: rawMaterial,
//         quality: selectedQuality,
//         required_quantity: quantity,
//         price: price,
//         location: selectedLocation,
//         date: date,
//         buyerID: uid // Pass UID here
//       });

//       console.log('Contract created:', response.data);
//     } catch (error) {
//       console.error('Error creating contract:', error);
//     }
//   };

//   return (
//     <div className="bg-green-100 p-10 min-h-screen flex justify-center items-center">
//       <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
//         {/* ... other components ... */}

//         <div className="p-8 bg-green-200 rounded-b-lg">
//           <h2 className="text-2xl font-bold">New Contract</h2>

//           {/* Raw Material Selection */}
//           <div className="mt-4 flex items-center">
//             <h3 className="text-xl font-semibold w-40">Raw Material</h3>
//             <select
//               className="w-full p-4 border rounded text-lg"
//               value={rawMaterial}
//               onChange={(e) => setRawMaterial(e.target.value)}
//             >
//               <option value="">Select Material</option>
//               <option value="Wheat">Wheat</option>
//               <option value="Paddy">Paddy</option>
//               <option value="Bajra">Bajra</option>
//               <option value="Cotton">Cotton</option>
//             </select>
//           </div>

//           {/* Quality Selection */}
//           <div className="mt-6 flex items-center">
//             <h3 className="text-xl font-semibold w-40">Quality</h3>
//             <div className="flex space-x-4">
//               <button
//                 className={`px-6 py-3 rounded text-lg ${selectedQuality === 'High' ? 'bg-green-500 text-white' : 'bg-white border'}`}
//                 onClick={() => setSelectedQuality('High')}
//               >
//                 High
//               </button>
//               <button
//                 className={`px-6 py-3 rounded text-lg ${selectedQuality === 'Common' ? 'bg-green-500 text-white' : 'bg-white border'}`}
//                 onClick={() => setSelectedQuality('Common')}
//               >
//                 Common
//               </button>
//               <button
//                 className={`px-6 py-3 rounded text-lg ${selectedQuality === 'Budget' ? 'bg-green-500 text-white' : 'bg-white border'}`}
//                 onClick={() => setSelectedQuality('Budget')}
//               >
//                 Budget
//               </button>
//             </div>
//           </div>

//           {/* Quantity Input */}
//           <div className="mt-6 flex items-center">
//             <h3 className="text-xl font-semibold w-40">Quantity</h3>
//             <input
//               className="w-full p-4 border rounded text-lg"
//               type="text"
//               placeholder="Min 100 Quintal"
//               value={quantity}
//               onChange={(e) => setQuantity(e.target.value)}
//             />
//           </div>

//           {/* Price Input */}
//           <div className="mt-6 flex items-center">
//             <h3 className="text-xl font-semibold w-40">Price</h3>
//             <input
//               className="w-full p-4 border rounded text-lg"
//               type="text"
//               placeholder="Min ₹2700 / Quintal"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//             />
//           </div>

//           {/* Location Input */}
//           <div className="mt-6 flex items-center">
//             <h3 className="text-xl font-semibold w-40">Location</h3>
//             <div className="relative w-full">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <MdLocationOn className="w-5 h-5 text-gray-500" />
//               </div>
//               <input
//                 className="w-full pl-10 p-4 border rounded-full text-lg"
//                 type="text"
//                 placeholder="Enter Location"
//                 value={selectedLocation}
//                 onChange={(e) => setSelectedLocation(e.target.value)}
//               />
//             </div>
//           </div>

//           {/* Time Input */}
//           <div className="mt-6 flex items-center">
//             <h3 className="text-xl font-semibold w-40">Time</h3>
//             <YearMonthPicker />
//           </div>

//           {/* Submit Button */}
//           <div className="mt-6">
//             <button
//               className="bg-green-500 text-white w-full rounded-full py-3 text-lg"
//               onClick={handleSubmit}
//             >
//               POST
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function SampleNextArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={`${className} bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600`}
//       style={{ ...style, display: "block", right: "-25px", zIndex: 1 }}
//       onClick={onClick}
//     />
//   );
// }

// SampleNextArrow.propTypes = {
//   className: PropTypes.string,
//   style: PropTypes.object,
//   onClick: PropTypes.func.isRequired,
// };

// function SamplePrevArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={`${className} bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600`}
//       style={{ ...style, display: "block", left: "-25px", zIndex: 1 }}
//       onClick={onClick}
//     />
//   );
// }

// SamplePrevArrow.propTypes = {
//   className: PropTypes.string,
//   style: PropTypes.object,
//   onClick: PropTypes.func.isRequired,
// };

// export default Supplier_Dash;
// import React, { useState } from 'react';
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import PropTypes from 'prop-types';
// import { MdLocationOn } from 'react-icons/md';
// import YearMonthPicker from '../Components/Supplier_Dash/YearMonthPicker';

// function Supplier_Dash() {
//   const [selectedQuality, setSelectedQuality] = useState('Common');
//   const [selectedLocation, setSelectedLocation] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [price, setPrice] = useState('');
//   const [uid, setUid] = useState(''); // Set UID from Signin.jsx here

//   const contracts = [
//     { id: 1, name: 'Wheat', acquired: 50, total: 6000, acquiredQty: 3000, monthsLeft: 14, approved: 16, rejected: 8, pending: 15 },
//     { id: 2, name: 'Paddy', acquired: 70, total: 4000, acquiredQty: 2800, monthsLeft: 10, approved: 20, rejected: 5, pending: 10 },
//     { id: 3, name: 'Bajra', acquired: 30, total: 5000, acquiredQty: 1500, monthsLeft: 20, approved: 10, rejected: 3, pending: 7 },
//     { id: 4, name: 'Cotton', acquired: 60, total: 7000, acquiredQty: 4200, monthsLeft: 18, approved: 18, rejected: 6, pending: 12 },
//   ];

//   const settings = {
//     dots: false,
//     infinite: false,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     nextArrow: <SampleNextArrow />,
//     prevArrow: <SamplePrevArrow />,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: true,
//         },
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           initialSlide: 1,
//         },
//       },
//     ],
//   };
//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const rawMaterial = document.querySelector('select[name="rawMaterial"]').value;
//     const requiredQuantity = quantity;
//     const priceValue = price;
//     const locationValue = selectedLocation;
//     const date = document.querySelector('input[name="date"]').value;

//     try {
//       const response = await fetch('http://localhost:4000/createContract', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           product: rawMaterial,
//           quality: selectedQuality,
//           required_quantity: requiredQuantity,
//           price: priceValue,
//           location: locationValue,
//           date: date,
//           buyerID: uid, // Send the UID here
//         }),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         alert('Contract created successfully!');
//         // Optionally reset form fields here
//       } else {
//         alert(`Error: ${result.error}`);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Failed to create contract');
//     }
//   };

//   return (
//     <div className="bg-green-100 p-10 min-h-screen flex justify-center items-center">
//       <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
//         <div className="p-8 bg-green-200 rounded-t-lg">
//           {/* ... (existing header and contract details) */}
//         </div>

//         <div className="p-8 bg-white">
//           {/* ... (existing contract slider) */}
//         </div>

//         <div className="p-8 bg-green-200 rounded-b-lg">
//           <h2 className="text-2xl font-bold">New Contract</h2>

//           {/* Raw Material Selection */}
//           <div className="mt-4 flex items-center">
//             <h3 className="text-xl font-semibold w-40">Raw Material</h3>
//             <select name="rawMaterial" className="w-full p-4 border rounded text-lg">
//               <option>Wheat</option>
//               <option>Paddy</option>
//               <option>Bajra</option>
//               <option>Cotton</option>
//             </select>
//           </div>

//           {/* Quality Selection */}
//           return (
//     <div className="bg-green-100 p-10 min-h-screen flex justify-center items-center">
//       <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
//         <div className="p-8 bg-green-200 rounded-t-lg">
//           <h2 className="text-2xl font-bold">Applications</h2>
//           <div className="mt-4 p-6 bg-green-300 rounded-lg flex justify-between items-center">
//             <div>
//               <p className="font-semibold text-xl">XYZ applied for JAN 2025 Wheat Order</p>
//               <p className="text-lg">10 QUINTALS @ ₹2850</p>
//             </div>
//             <div className="flex space-x-4">
//               <button className="bg-green-500 text-white rounded-full px-6 py-3 text-lg">Approve</button>
//               <button className="bg-red-500 text-white rounded-full px-6 py-3 text-lg">Reject</button>
//               <button className="bg-blue-500 text-white rounded-full px-6 py-3 text-lg">Negotiate</button>
//             </div>
//           </div>
//         </div>

//         <div className="p-8 bg-white">
//           <h2 className="text-2xl font-bold">Your Contracts</h2>
//           <div className="mt-4 pb-4">
//             <Slider {...settings}>
//               {contracts.map(contract => (
//                 <div key={contract.id} className="px-2">
//                   <div className="bg-green-300 rounded-lg p-6 shadow-md hover:shadow-lg transform transition duration-300 ease-in-out hover:scale-105">
//                     <p className="font-semibold text-xl mb-2">{contract.name}</p>
//                     <div className="flex justify-between items-center mb-4">
//                       <p className="text-sm text-gray-700">Acquired: {contract.acquired}%</p>
//                       <p className="text-sm text-gray-700">{contract.monthsLeft} Months left</p>
//                     </div>
//                     <div className="bg-white p-4 rounded-lg shadow-inner">
//                       <p className="font-medium text-lg text-gray-800">{contract.acquiredQty} of {contract.total} Quintals</p>
//                       <div className="mt-2 flex justify-between text-sm text-gray-600">
//                         <span>{contract.approved} Approved</span>
//                         <span>{contract.rejected} Rejected</span>
//                         <span>{contract.pending} Pending</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </Slider>
//           </div>
//         </div>

//         <div className="p-8 bg-green-200 rounded-b-lg">
//           <h2 className="text-2xl font-bold">New Contract</h2>

//           {/* Raw Material Selection */}
//           <div className="mt-4 flex items-center">
//             <h3 className="text-xl font-semibold w-40">Raw Material</h3>
//             <select className="w-full p-4 border rounded text-lg">
//               <option>Wheat</option>
//               <option>Paddy</option>
//               <option>Bajra</option>
//               <option>Cotton</option>
//             </select>
//           </div>

//           {/* Quality Selection */}
//           <div className="mt-6 flex items-center">
//             <h3 className="text-xl font-semibold w-40">Quality</h3>
//             <div className="flex space-x-4">
//               <button
//                 className={`px-6 py-3 rounded text-lg ${selectedQuality === 'High' ? 'bg-green-500 text-white' : 'bg-white border'}`}
//                 onClick={() => setSelectedQuality('High')}
//               >
//                 High
//               </button>
//               <button
//                 className={`px-6 py-3 rounded text-lg ${selectedQuality === 'Common' ? 'bg-green-500 text-white' : 'bg-white border'}`}
//                 onClick={() => setSelectedQuality('Common')}
//               >
//                 Common
//               </button>
//               <button
//                 className={`px-6 py-3 rounded text-lg ${selectedQuality === 'Budget' ? 'bg-green-500 text-white' : 'bg-white border'}`}
//                 onClick={() => setSelectedQuality('Budget')}
//               >
//                 Budget
//               </button>
//             </div>
//           </div>

//           {/* Quantity Input */}
//           <div className="mt-6 flex items-center">
//             <h3 className="text-xl font-semibold w-40">Quantity</h3>
//             <input
//               className="w-full p-4 border rounded text-lg"
//               type="text"
//               placeholder="Min 100 Quintal"
//               value={quantity}
//               onChange={(e) => setQuantity(e.target.value)}
//             />
//           </div>

//           {/* Price Input */}
//           <div className="mt-6 flex items-center">
//             <h3 className="text-xl font-semibold w-40">Price</h3>
//             <input
//               className="w-full p-4 border rounded text-lg"
//               type="text"
//               placeholder="Min ₹2700 / Quintal"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//             />
//           </div>

//           {/* Location Input */}
//           <div className="mt-6 flex items-center">
//             <h3 className="text-xl font-semibold w-40">Location</h3>
//             <div className="relative w-full">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <MdLocationOn className="w-5 h-5 text-gray-500" />
//               </div>
//               <input
//                 className="w-full pl-10 p-4 border rounded-full text-lg"
//                 type="text"
//                 placeholder="Enter Location"
//                 value={selectedLocation}
//                 onChange={(e) => setSelectedLocation(e.target.value)}
//               />
//             </div>
//           </div>

//           {/* Time Input */}
//           <div className="mt-6 flex items-center">
//             <h3 className="text-xl font-semibold w-40">Time</h3>
//             <YearMonthPicker />
//           </div>

//           {/* Submit Button */}
//           <div className="mt-6">
//             <button
//               className="bg-green-500 text-white w-full rounded-full py-3 text-lg"
//               onClick={handleSubmit}
//             >
//               POST
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function SampleNextArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={`${className} bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600`}
//       style={{ ...style, display: "block", right: "-25px", zIndex: 1 }}
//       onClick={onClick}
//     />
//   );
// }

// SampleNextArrow.propTypes = {
//   className: PropTypes.string,
//   style: PropTypes.object,
//   onClick: PropTypes.func.isRequired,
// };

// function SamplePrevArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={`${className} bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600`}
//       style={{ ...style, display: "block", left: "-25px", zIndex: 1 }}
//       onClick={onClick}
//     />
//   );
// }

// SamplePrevArrow.propTypes = {
//   className: PropTypes.string,
//   style: PropTypes.object,
//   onClick: PropTypes.func.isRequired,
// };

// export default Supplier_Dash;

{/* 
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
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
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

//           {/* Raw Material Selection */}
//           <div className="mt-4 flex items-center">
//             <h3 className="text-xl font-semibold w-40">Raw Material</h3>
//             <select className="w-full p-4 border rounded text-lg">
//               <option>Wheat</option>
//               <option>Paddy</option>
//               <option>Bajra</option>
//               <option>Cotton</option>
//             </select>
//           </div>

//           {/* Quality Selection */}
//           <div className="mt-6 flex items-center">
//             <h3 className="text-xl font-semibold w-40">Quality</h3>
//             <div className="flex space-x-4">
//               <button
//                 className={`px-6 py-3 rounded text-lg ${selectedQuality === 'High' ? 'bg-green-500 text-white' : 'bg-white border'}`}
//                 onClick={() => setSelectedQuality('High')}
//               >
//                 High
//               </button>
//               <button
//                 className={`px-6 py-3 rounded text-lg ${selectedQuality === 'Common' ? 'bg-green-500 text-white' : 'bg-white border'}`}
//                 onClick={() => setSelectedQuality('Common')}
//               >
//                 Common
//               </button>
//               <button
//                 className={`px-6 py-3 rounded text-lg ${selectedQuality === 'Budget' ? 'bg-green-500 text-white' : 'bg-white border'}`}
//                 onClick={() => setSelectedQuality('Budget')}
//               >
//                 Budget
//               </button>
//             </div>
//           </div>

//           {/* Quantity Input */}
//           <div className="mt-6 flex items-center">
//             <h3 className="text-xl font-semibold w-40">Quantity</h3>
//             <input className="w-full p-4 border rounded text-lg" type="text" placeholder="Min 100 Quintal" />
//           </div>

//           {/* Price Input */}
//           <div className="mt-6 flex items-center">
//             <h3 className="text-xl font-semibold w-40">Price</h3>
//             <input className="w-full p-4 border rounded text-lg" type="text" placeholder="Min ₹2700 / Quintal" />
//           </div>

//           {/* Location Input */}
//           <div className="mt-6 flex items-center">
//             <h3 className="text-xl font-semibold w-40">Location</h3>
//             <div className="relative w-full">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <MdLocationOn className="w-5 h-5 text-gray-500" />
//               </div>
//               <input
//                 className="w-full pl-10 p-4 border rounded-full text-lg"
//                 type="text"
//                 placeholder="Enter Location"
//                 value={selectedLocation}
//                 onChange={(e) => setSelectedLocation(e.target.value)}
//               />
//             </div>
//           </div>

//           {/* Time Input */}
//           <div className="mt-6 flex items-center">
//             <h3 className="text-xl font-semibold w-40">Time</h3>
//             <YearMonthPicker />
//           </div>

//           {/* Submit Button */}
//           <div className="mt-6">
//             <button className="bg-green-500 text-white w-full rounded-full py-3 text-lg">POST</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function SampleNextArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={`${className} bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600`}
//       style={{ ...style, display: "block", right: "-25px", zIndex: 1 }}
//       onClick={onClick}
//     />
//   );
// }

// SampleNextArrow.propTypes = {
//   className: PropTypes.string,
//   style: PropTypes.object,
//   onClick: PropTypes.func.isRequired,
// };

// function SamplePrevArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={`${className} bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600`}
//       style={{ ...style, display: "block", left: "-25px", zIndex: 1 }}
//       onClick={onClick}
//     />
//   );
// }

// SamplePrevArrow.propTypes = {
//   className: PropTypes.string,
//   style: PropTypes.object,
//   onClick: PropTypes.func.isRequired,
// };

// export default Supplier_Dash; */}

// import React, { useState } from 'react';
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import PropTypes from 'prop-types';
// import { MdLocationOn } from 'react-icons/md';
// import YearMonthPicker from '../Components/Supplier_Dash/YearMonthPicker';

// function Supplier_Dash() {
//   const [selectedQuality, setSelectedQuality] = useState('Common');
//   const [selectedLocation, setSelectedLocation] = useState('');

//   const contracts = [
//     { id: 1, name: 'Wheat', acquired: 50, total: 6000, acquiredQty: 3000, monthsLeft: 14, approved: 16, rejected: 8, pending: 15 },
//     { id: 2, name: 'Paddy', acquired: 70, total: 4000, acquiredQty: 2800, monthsLeft: 10, approved: 20, rejected: 5, pending: 10 },
//     { id: 3, name: 'Bajra', acquired: 30, total: 5000, acquiredQty: 1500, monthsLeft: 20, approved: 10, rejected: 3, pending: 7 },
//     { id: 4, name: 'Cotton', acquired: 60, total: 7000, acquiredQty: 4200, monthsLeft: 18, approved: 18, rejected: 6, pending: 12 },
//   ];

//   const settings = {
//     dots: false,
//     infinite: false,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     nextArrow: <SampleNextArrow />,
//     prevArrow: <SamplePrevArrow />,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: true
//         }
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           initialSlide: 1
//         }
//       }
//     ]
//   };

//   return (
//     <div className="bg-green-100 p-10 min-h-screen flex justify-center items-center">
//       <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
//         <div className="p-8 bg-green-200 rounded-t-lg">
//           <h2 className="text-2xl font-bold">Applications</h2>
//           <div className="mt-4 p-6 bg-green-300 rounded-lg flex justify-between items-center">
//             <div>
//               <p className="font-semibold text-xl">XYZ applied for JAN 2025 Wheat Order</p>
//               <p className="text-lg">10 QUINTALS @ ₹2850</p>
//             </div>
//             <div className="flex space-x-4">
//               <button className="bg-green-500 text-white rounded-full px-6 py-3 text-lg">Approve</button>
//               <button className="bg-red-500 text-white rounded-full px-6 py-3 text-lg">Reject</button>
//               <button className="bg-blue-500 text-white rounded-full px-6 py-3 text-lg">Negotiate</button>
//             </div>
//           </div>
//         </div>

//         <div className="p-8 bg-white">
//           <h2 className="text-2xl font-bold">Your Contracts</h2>
//           <div className="mt-4 pb-4">
//             <Slider {...settings}>
//               {contracts.map(contract => (
//                 <div key={contract.id} className="px-2">
//                   <div className="bg-green-300 rounded-lg p-6 shadow-md hover:shadow-lg transform transition duration-300 ease-in-out hover:scale-105">
//                     <p className="font-semibold text-xl mb-2">{contract.name}</p>
//                     <div className="flex justify-between items-center mb-4">
//                       <p className="text-sm text-gray-700">Acquired: {contract.acquired}%</p>
//                       <p className="text-sm text-gray-700">{contract.monthsLeft} Months left</p>
//                     </div>
//                     <div className="bg-white p-4 rounded-lg shadow-inner">
//                       <p className="font-medium text-lg text-gray-800">{contract.acquiredQty} of {contract.total} Quintals</p>
//                       <div className="mt-2 flex justify-between text-sm text-gray-600">
//                         <span>{contract.approved} Approved</span>
//                         <span>{contract.rejected} Rejected</span>
//                         <span>{contract.pending} Pending</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </Slider>
//           </div>
//         </div>

//         <div className="p-8 bg-green-200 rounded-b-lg">
//           <h2 className="text-2xl font-bold">New Contract</h2>
          
//           {/* Raw Material Selection */}
//           <div className="mt-4 flex items-center">
//             <h3 className="text-xl font-semibold w-40">Raw Material</h3>
//             <select className="w-full p-4 border rounded text-lg">
//               <option>Wheat</option>
//               <option>Paddy</option>
//               <option>Bajra</option>
//               <option>Cotton</option>
//             </select>
//           </div>

//           {/* Quality Selection */}
//           <div className="mt-6 flex items-center">
//             <h3 className="text-xl font-semibold w-40">Quality</h3>
//             <div className="flex space-x-4">
//               <button
//                 className={`px-6 py-3 rounded text-lg ${selectedQuality === 'High' ? 'bg-green-500 text-white' : 'bg-white border'}`}
//                 onClick={() => setSelectedQuality('High')}
//               >
//                 High
//               </button>
//               <button
//                 className={`px-6 py-3 rounded text-lg ${selectedQuality === 'Common' ? 'bg-green-500 text-white' : 'bg-white border'}`}
//                 onClick={() => setSelectedQuality('Common')}
//               >
//                 Common
//               </button>
//               <button
//                 className={`px-6 py-3 rounded text-lg ${selectedQuality === 'Budget' ? 'bg-green-500 text-white' : 'bg-white border'}`}
//                 onClick={() => setSelectedQuality('Budget')}
//               >
//                 Budget
//               </button>
//             </div>
//           </div>

//           {/* Quantity Input */}
//           <div className="mt-6 flex items-center">
//             <h3 className="text-xl font-semibold w-40">Quantity</h3>
//             <input className="w-full p-4 border rounded text-lg" type="text" placeholder="Min 100 Quintal" />
//           </div>

//           {/* Price Input */}
//           <div className="mt-6 flex items-center">
//             <h3 className="text-xl font-semibold w-40">Price</h3>
//             <input className="w-full p-4 border rounded text-lg" type="text" placeholder="Min ₹2700 / Quintal" />
//           </div>

//           {/* Location Input */}
//           <div className="mt-6 flex items-center">
//             <h3 className="text-xl font-semibold w-40">Location</h3>
//             <div className="relative w-full">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <MdLocationOn className="w-5 h-5 text-gray-500" />
//               </div>
//               <input
//                 className="w-full pl-10 p-4 border rounded-full text-lg"
//                 type="text"
//                 placeholder="Enter Location"
//                 value={selectedLocation}
//                 onChange={(e) => setSelectedLocation(e.target.value)}
//               />
//             </div>
//           </div>
//           <div className="mt-6 flex items-center">
//             <h3 className="text-xl font-semibold w-40">Time</h3>
//             <YearMonthPicker/>
//           </div>

//           <div className="mt-6">
//             <button className="bg-green-500 text-white w-full rounded-full py-3 text-lg">POST</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function SampleNextArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={`${className} bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600`}
//       style={{ ...style, display: "block", right: "-25px", zIndex: 1 }}
//       onClick={onClick}
//     />
//   );
// }

// SampleNextArrow.propTypes = {
//   className: PropTypes.string,
//   style: PropTypes.object,
//   onClick: PropTypes.func.isRequired,
// };

// function SamplePrevArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={`${className} bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600`}
//       style={{ ...style, display: "block", left: "-25px", zIndex: 1 }}
//       onClick={onClick}
//     />
//   );
// }

// SamplePrevArrow.propTypes = {
//   className: PropTypes.string,
//   style: PropTypes.object,
//   onClick: PropTypes.func.isRequired,
// };

// export default Supplier_Dash;
// import React, { useState } from 'react';
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import PropTypes from 'prop-types';
// import { MdLocationOn } from 'react-icons/md';
// import YearMonthPicker from '../Components/Supplier_Dash/YearMonthPicker';

// function Supplier_Dash() {
//   const [selectedQuality, setSelectedQuality] = useState('Common');
//   const [selectedLocation, setSelectedLocation] = useState('');

//   const contracts = [
//     { id: 1, name: 'Wheat', acquired: 50, total: 6000, acquiredQty: 3000, monthsLeft: 14, approved: 16, rejected: 8, pending: 15 },
//     { id: 2, name: 'Paddy', acquired: 70, total: 4000, acquiredQty: 2800, monthsLeft: 10, approved: 20, rejected: 5, pending: 10 },
//     { id: 3, name: 'Bajra', acquired: 30, total: 5000, acquiredQty: 1500, monthsLeft: 20, approved: 10, rejected: 3, pending: 7 },
//     { id: 4, name: 'Cotton', acquired: 60, total: 7000, acquiredQty: 4200, monthsLeft: 18, approved: 18, rejected: 6, pending: 12 },
//   ];

//   const settings = {
//     dots: false,
//     infinite: false,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     nextArrow: <SampleNextArrow />,
//     prevArrow: <SamplePrevArrow />,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: true,
//         },
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           initialSlide: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <div className="bg-green-100 p-10 min-h-screen flex justify-center items-center">
//       <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
//         <div className="p-8 bg-green-200 rounded-t-lg">
//           <h2 className="text-2xl font-bold">Applications</h2>
//           <div className="mt-4 p-6 bg-green-300 rounded-lg flex justify-between items-center">
//             <div>
//               <p className="font-semibold text-xl">XYZ applied for JAN 2025 Wheat Order</p>
//               <p className="text-lg">10 QUINTALS @ ₹2850</p>
//             </div>
//             <div className="flex space-x-4">
//               <button className="bg-green-500 text-white rounded-full px-6 py-3 text-lg">Approve</button>
//               <button className="bg-red-500 text-white rounded-full px-6 py-3 text-lg">Reject</button>
//               <button className="bg-blue-500 text-white rounded-full px-6 py-3 text-lg">Negotiate</button>
//             </div>
//           </div>
//         </div>

//         <div className="p-8 bg-white">
//           <h2 className="text-2xl font-bold">Your Contracts</h2>
//           <div className="mt-4 pb-4">
//             <Slider {...settings}>
//               {contracts.map((contract) => (
//                 <div key={contract.id} className="px-2">
//                   <div className="bg-green-300 rounded-lg p-6 shadow-md hover:shadow-lg transform transition duration-300 ease-in-out hover:scale-105">
//                     <p className="font-semibold text-xl mb-2">{contract.name}</p>
//                     <div className="flex justify-between items-center mb-4">
//                       <p className="text-sm text-gray-700">Acquired: {contract.acquired}%</p>
//                       <p className="text-sm text-gray-700">{contract.monthsLeft} Months left</p>
//                     </div>
//                     <div className="bg-white p-4 rounded-lg shadow-inner">
//                       <p className="font-medium text-lg text-gray-800">
//                         {contract.acquiredQty} of {contract.total} Quintals
//                       </p>
//                       <div className="mt-2 flex justify-between text-sm text-gray-600">
//                         <span>{contract.approved} Approved</span>
//                         <span>{contract.rejected} Rejected</span>
//                         <span>{contract.pending} Pending</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </Slider>
//           </div>
//         </div>

//         <div className="p-8 bg-green-200 rounded-b-lg">
//           <h2 className="text-2xl font-bold">New Contract</h2>

//           {/* Raw Material Selection */}
//           <div className="mt-4 flex items-center">
//             <h3 className="text-xl font-semibold w-40">Raw Material</h3>
//             <select className="w-full p-4 border rounded text-lg">
//               <option>Wheat</option>
//               <option>Paddy</option>
//               <option>Bajra</option>
//               <option>Cotton</option>
//             </select>
//           </div>

//           {/* Quality Selection */}
//           <div className="mt-6 flex items-center">
//             <h3 className="text-xl font-semibold w-40">Quality</h3>
//             <div className="flex space-x-4">
//               <button
//                 className={`px-6 py-3 rounded text-lg ${
//                   selectedQuality === 'High' ? 'bg-green-500 text-white' : 'bg-white border'
//                 }`}
//                 onClick={() => setSelectedQuality('High')}
//               >
//                 High
//               </button>
//               <button
//                 className={`px-6 py-3 rounded text-lg ${
//                   selectedQuality === 'Common' ? 'bg-green-500 text-white' : 'bg-white border'
//                 }`}
//                 onClick={() => setSelectedQuality('Common')}
//               >
//                 Common
//               </button>
//               <button
//                 className={`px-6 py-3 rounded text-lg ${
//                   selectedQuality === 'Budget' ? 'bg-green-500 text-white' : 'bg-white border'
//                 }`}
//                 onClick={() => setSelectedQuality('Budget')}
//               >
//                 Budget
//               </button>
//             </div>
//           </div>

//           {/* Quantity Input */}
//           <div className="mt-6 flex items-center">
//             <h3 className="text-xl font-semibold w-40">Quantity</h3>
//             <input
//               className="w-full p-4 border rounded text-lg"
//               type="text"
//               placeholder="Min 100 Quintal"
//             />
//           </div>

//           {/* Price Input */}
//           <div className="mt-6 flex items-center">
//             <h3 className="text-xl font-semibold w-40">Price</h3>
//             <input
//               className="w-full p-4 border rounded text-lg"
//               type="text"
//               placeholder="Min ₹2700 / Quintal"
//             />
//           </div>

//           {/* Location Input */}
//           <div className="mt-6 flex items-center">
//             <h3 className="text-xl font-semibold w-40">Location</h3>
//             <div className="relative w-full">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <MdLocationOn className="w-5 h-5 text-gray-500" />
//               </div>
//               <input
//                 className="w-full pl-10 p-4 border rounded-full text-lg"
//                 type="text"
//                 placeholder="Enter Location"
//                 value={selectedLocation}
//                 onChange={(e) => setSelectedLocation(e.target.value)}
//               />
//             </div>
//           </div>

//           {/* Time Input */}
//           <div className="mt-6 flex items-center">
//             <h3 className="text-xl font-semibold w-40">Time</h3>
//             <YearMonthPicker />
//           </div>

//           <div className="mt-6">
//             <button className="bg-green-500 text-white w-full rounded-full py-3 text-lg">
//               POST
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function SampleNextArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={`${className} bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600`}
//       style={{ ...style, display: 'block', right: '-25px', zIndex: 1 }}
//       onClick={onClick}
//     />
//   );
// }

// SampleNextArrow.propTypes = {
//   className: PropTypes.string,
//   style: PropTypes.object,
//   onClick: PropTypes.func.isRequired,
// };

// function SamplePrevArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={`${className} bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600`}
//       style={{ ...style, display: 'block', left: '-25px', zIndex: 1 }}
//       onClick={onClick}
//     />
//   );
// }

// SamplePrevArrow.propTypes = {
//   className: PropTypes.string,
//   style: PropTypes.object,
//   onClick: PropTypes.func.isRequired,
// };

// export default Supplier_Dash;
