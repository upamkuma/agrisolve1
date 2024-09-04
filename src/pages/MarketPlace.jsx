import React, { useState } from 'react'
import Dashboard from '../Components/MarketPlace/Buy/Dashboard'
import PillNav from '../Components/MarketPlace/Buy/Navigation'
import MarketPlaceSell from '../Components/MarketPlace/Sell/MarketPlaceSell'

const MarketPlace = () => {
  const [isbuy, setIsbuy] = useState(true)
  return (
    <div className="min-h-screen bg-light-green flex flex-col">
     

      <div className="flex justify-center  px-6  gap-2 py-4">
        <button onClick={()=>setIsbuy(true)} className={`${isbuy?'bg-green-300 rounded-3xl p-3':''}  flex items-center text-dark-green font-semibold`}>
          <span className="mr-2">🛒</span> Buy
        </button>
        <button onClick={()=>setIsbuy(false)} className={`${isbuy?'':'bg-green-300 rounded-3xl p-3'} flex items-center text-dark-green font-semibold`}>
          <span className="mr-2">💰</span> Sell
        </button>
      </div>      
      
      {isbuy?(
        <>
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
        </>
  
      ):(
        <>
        <MarketPlaceSell/>
        </>
      )}  
    
    </div>
  )
}

export default MarketPlace