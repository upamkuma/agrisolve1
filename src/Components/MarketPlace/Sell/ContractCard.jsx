
import axios from 'axios'
import { useEffect, useState } from 'react'
import Card from './Card'

const ContractCard = ({setIsApply,isApply,productName,setProductName,productDate,setProductDate}) => {
   
    const [Title, setTitle] = useState(null)
    const [Amount, setAmount] = useState(null)
    const [Date, setDate] = useState(null)
    const[Location, setLocation] = useState(null)
    const [Data, setData] = useState([])
    useEffect(()=>{
        try {
            const fetch=async()=>{
                const response=await axios.get('/contracts')
                const data=response.data
                setData(data)
                data.map(data=>{
                    setTitle(data.product)
                    setAmount(data.price)
                    setDate(data.date)
                    setLocation(data.location)
                  
                })                
            }
            fetch()
         
        } catch (error) {
            console.error(error)
        }
    },[])
    console.log(Data[0])
    

  return (
    <>
        
        {Data.map(data=>{
                return(
                    <Card  key={data.date} Title={data.product} Amount={data.price} Date={data.date} Location={data.location}
                    setIsApply={setIsApply} apply={isApply} setProductDate={setProductDate} productDate={setProductDate} setProductName={setProductName} productName={setProductName}                   
                    />
                )
            })}
        </>
        
  )
}

export default ContractCard