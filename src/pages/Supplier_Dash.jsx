import React from 'react'

const Supplier_Dash = () => {
  return (
    <div className="bg-green-100 p-4 min-h-screen">
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-green-200 rounded-t-lg">
        <h2 className="text-lg font-bold">Applications</h2>
        <div className="mt-2 p-4 bg-green-300 rounded-lg">
          <p className="font-semibold">XYZ applied for JAN 2025 Wheat Order</p>
          <p>10 QUINTALS @ ₹2850</p>
          <div className="mt-2 flex space-x-2">
            <button className="bg-green-500 text-white rounded-full px-4 py-2">Approve</button>
            <button className="bg-red-500 text-white rounded-full px-4 py-2">Reject</button>
            <button className="bg-blue-500 text-white rounded-full px-4 py-2">Negotiate</button>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white">
        <h2 className="text-lg font-bold">Your Contracts</h2>
        <div className="mt-2 p-4 bg-green-300 rounded-lg">
          <p className="font-semibold">Wheat</p>
          <p>Acquired: 50%</p>
          <p>3000 of 6000 Quintals - 14 Months left</p>
          <div className="mt-2">
            <p>Applications: 16 Approved, 8 Rejected, 15 Pending</p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-green-200 rounded-b-lg">
        <h2 className="text-lg font-bold">New Contract</h2>
        <div className="mt-2">
          <select className="w-full p-2 border rounded">
            <option>Wheat</option>
            <option>Paddy</option>
            <option>Bajra</option>
            <option>Cotton</option>
          </select>
        </div>

        <div className="mt-4 flex space-x-2">
          <button className="bg-white border px-4 py-2 rounded">High</button>
          <button className="bg-orange-300 px-4 py-2 rounded">Common</button>
          <button className="bg-white border px-4 py-2 rounded">Budget</button>
        </div>

        <div className="mt-4">
          <input className="w-full p-2 border rounded" type="text" placeholder="Min 100 Quintal" />
        </div>

        <div className="mt-4">
          <input className="w-full p-2 border rounded" type="text" placeholder="Min ₹2700 / Quintal" />
        </div>

        <div className="mt-4 flex items-center">
          <div className="text-black bg-gray-200 rounded px-4 py-2">
            📍 Aleja Pokoju
          </div>
        </div>

        <div className="mt-4">
          <button className="bg-green-500 text-white w-full rounded-full py-2">POST</button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Supplier_Dash
