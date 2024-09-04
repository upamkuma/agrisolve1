import React from 'react'
import Dashboard from '../Components/MarketPlace/Buy/Dashboard'
import PillNav from '../Components/MarketPlace/Buy/Navigation'

const MarketPlace = () => {
  return (
    <div className="min-h-screen bg-light-green flex flex-col">
      {/* <header className="bg-white p-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-dark-green">9:41</div>
        <div className="flex space-x-2">
          <div className="w-4 h-4 bg-dark-green rounded-full"></div>
          <div className="w-4 h-4 bg-dark-green rounded-full"></div>
          <div className="w-4 h-4 bg-dark-green rounded-full"></div>
        </div>
      </header> */}

      <div className="flex justify-center px-6 py-4">
        <button className="flex items-center text-dark-green font-semibold">
          <span className="mr-2">🛒</span> Buy
        </button>
        <button className="flex items-center text-dark-green font-semibold">
          <span className="mr-2">💰</span> Sell
        </button>
      </div>

      <div className="px-6 mb-4">
        <input
        
          type="text"
          className="w-full px-4 py-2 rounded-full bg-white text-dark-green placeholder-dark-green"
          placeholder="Search Products"
        />
      </div>

      <PillNav />

      <div className="px-6 py-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-dark-green">Featured Products</h2>
          <a href="#" className="text-dark-green">See All</a>
        </div>
        <Dashboard />
      </div>

      {/* <nav className="mt-auto bg-white p-4 flex justify-around">
        <button className="text-dark-green">✨</button>
        <button className="text-dark-green">🌍</button>
        <button className="text-dark-green">🛒</button>
        <button className="text-dark-green">👤</button>
      </nav> */}
    </div>
  )
}

export default MarketPlace