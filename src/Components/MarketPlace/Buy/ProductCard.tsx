import React from 'react';

const ProductCard = ({ image, name, description, price }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={image} alt={name} className="w-full h-48 object-contain" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-dark-green">{name}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
        <p className="text-dark-green font-bold mt-2">INR {price}</p>
      </div>
    </div>
  );
};

export default ProductCard;