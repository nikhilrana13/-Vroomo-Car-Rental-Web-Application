import Icon from '@mdi/react';
import React from 'react'
import { GiCarSeat } from "react-icons/gi";
import { TbManualGearboxFilled } from "react-icons/tb";
import { LuFuel } from "react-icons/lu";
import fallbackcar from "../../assets/fallbackcar.jpg"
import { NavLink, useLocation } from 'react-router-dom';



const CarDetailCard = ({Car}) => {
  const Location = useLocation()
  const {Model,Year,seatingcapacity,transmission,fueltype,location,image,Description,Dailyprice} = Car
  return (
    <div class={`relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg ${Location.pathname === "/find-cars" ? "md:w-[320px]" : "md:w-96"} w-full  `}>
   <span className='text-[1.7rem] p-4  font-[600]'>{Year + " " + Model || "NA"}</span>
  <div class={` relative ${Location.pathname === "/find-cars" ? "h-50":"h-80"} m-2.5 overflow-hidden text-white`}>
    <img src={image || fallbackcar} alt="card-image" className='object-cover rounded-md' />
  </div>
  <div class="p-4">
    <div className='flex items-center gap-2'>
         <div className='flex items-center gap-2'>
            <GiCarSeat className='text-[#0946EE]' />
            <span className='text-gray-500'>{seatingcapacity || 0 } seats</span>
        </div>
        <div className='flex items-center gap-2'>
             <TbManualGearboxFilled className='text-[#0946EE]' />
            <span className='text-gray-500'>{transmission || "NA"}</span>
        </div>
          <div className='flex items-center gap-2'>
             <LuFuel className='text-[#0946EE]' />
            <span className='text-gray-500'>{fueltype || "NA"}</span>
        </div>

    </div>
    <p class="text-slate-600 max-w-[200px]  mt-3 leading-normal font-light">
      {Description ? Description.length > 35 ? Description.slice(0,35) + "...":Description : "NA"}
    </p>
  </div>
  <div class="px-4 pb-4 flex justify-between pt-0 mt-2">
    <span className='text-gray-500 font-[600]'>${Dailyprice || 0}/day</span>
    <NavLink to={`/car-details/${Car._id}`}>
        <button class="rounded-md  bg-[#0946EE] font-[500] text-white hover:bg-black  px-7 py-2"  type="button">
      Details
    </button>

    </NavLink>
  
  </div>
</div>  
  )
}

export default CarDetailCard