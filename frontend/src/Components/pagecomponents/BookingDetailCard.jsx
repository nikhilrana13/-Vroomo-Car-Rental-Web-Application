import { Calendar, LocationEdit } from 'lucide-react'
import React from 'react'
import unknownCar from "../../assets/fallbackcar.jpg"

const BookingDetailCard = ({image,model,year,index,location,totalprice,createdat,pickupdate,returndate,status,category}) => {
  return (
    <div className='border p-4  rounded-md max-w-[1200px] flex md:flex-row flex-col justify-between'>
        {/* left side */}
        <div className='flex flex-col md:flex-row flex-wrap md:w-auto w-full gap-4'>
            <div className='flex flex-col md:w-[400px] gap-1'>
                <img src={ image ||unknownCar} className='h-56 w-full  object-cover rounded-md' alt="" />
                 <span className='text-[1rem] font-[600]'>{model || "NA"}</span>
                 <span className='text-gray-500'>{year || "NA"}.{category || "NA"}.{location || "NA"}</span>
            </div>
            <div className='flex flex-col gap-3'>
                <div className='flex items-center gap-2'>
                    <span className='px-3 py-2 rounded-md font-[600] bg-slate-100'>Booking #{index || 0}</span>
                    {
                        status === "pending" ?  <span className='px-3 py-1 rounded-md text-white font-medium bg-red-500'>pending</span> : <span className='px-3 py-1 rounded-md text-white font-medium bg-green-500'>Confirmed</span>
                    }
                </div>
                <div className='flex gap-2 p-2'>
                  <Calendar />
                  <div className='flex flex-col gap-1'>
                     <span className='text-gray-500'>Rental Period</span>
                     <span className='font-[700]'>{pickupdate || "NA"} To {returndate}</span>
                  </div>
                </div>
                  <div className='flex p-2 gap-2'>
                  <LocationEdit />
                  <div className='flex flex-col gap-1'>
                     <span className='text-gray-500'>Pick up location</span>
                     <span className='font-[700]'>{location || "NA"}</span>
                  </div>
                </div>
            </div>
        </div>
        {/* right side */}
        <div className='flex flex-col gap-1 md:text-right md:w-auto w-full'>
            <div className='flex flex-col'>
            <span className='text-gray-500   text-[1rem]'>Total price</span>
            <span className='text-blue-500 text-[1.4rem]'>${totalprice || 0}</span>
            </div>
            
            <span className='text-gray-500'>Booked on {createdat || "NA"}</span>
        </div>

    </div>
  )
}

export default BookingDetailCard