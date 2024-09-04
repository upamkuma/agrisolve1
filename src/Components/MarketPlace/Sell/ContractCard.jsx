
import { FaLocationDot } from 'react-icons/fa6'
import {  useNavigate } from 'react-router-dom'

const ContractCard = ({title,amount,month,year}) => {
    const navigate=useNavigate()
    const handleOnClick = ()=>{
        navigate('/apply')
    }
  return (
    <div className='bg-[#508D4E] rounded-3xl w-[30vw]'>
            <div className='flex justify-between items-center px-5 pt-3  '>
                <h1 className='text-black font-semibold text-2xl'>{title}</h1>
                <span className='rounded-2xl bg-white text-green-500 px-5 text-gray-700 '>Contract</span>
            </div>        
            <div className='ml-5 text-gray-700 flex items-center'>
                By {month} {year}
            </div>
            <div className='text-white text-3xl flex items-center justify-center font-bold'>
                    <h1>₹{amount}/ QUINTOL</h1>
            </div>
            <div className='flex items-start justify-between p-5 pb-3'>
            <h1 className='text-black font-semibold text-xl flex items-center'>
            <FaLocationDot/>
                India</h1>
            <button  onClick={handleOnClick}
            className='rounded-2xl bg-white text-green-500 px-5 text-gray-700 hover:bg-green-950' >Apply</button>

            </div>
            
        </div>
  )
}

export default ContractCard