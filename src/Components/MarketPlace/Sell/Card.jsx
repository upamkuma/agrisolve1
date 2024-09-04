import React from 'react'
import { FaLocationDot } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
const Card = ({Title,Date,Amount,Location,setIsApply,Apply,setProductName,setProductDate,productName,productDate}) => {
    const navigate=useNavigate()
    const handleOnClick = ()=>{
        setIsApply(true)
        setProductName(Title)
        setProductDate(Date)

    }

  return (
    <>
     <div className='bg-[#508D4E] rounded-3xl w-[30vw] shadow-lg hover:shadow-xl transform transition duration-300 ease-in-out hover:scale-105'>

<div className='flex justify-between items-center px-5 pt-3  '>
                <h1 className='text-black font-semibold text-2xl'>{Title}</h1>
                <span className='rounded-2xl bg-white text-green-500 px-5 text-gray-700 '>Contract</span>
            </div>        
            <div className='ml-5 text-gray-700 flex items-center'>
                By {Date}
            </div>
            <div className='text-white text-3xl flex items-center justify-center font-bold'>
                    <h1>₹{Amount}/ QUINTOL</h1>
            </div>
            <div className='flex items-start justify-between p-5 pb-3'>
            <h1 className='text-black font-semibold text-xl flex items-center'>
            <FaLocationDot/>
                {Location}</h1>
            <button  onClick={handleOnClick}
            className='rounded-2xl bg-white text-green-500 px-5 text-gray-700 hover:bg-green-950' >Apply</button>

            </div>
            </div>


</>
            
  )
}

export default Card