import React from 'react'
import { NavLink } from 'react-router-dom'

const OwnerNavbar = ({ownername}) => {
  return (
     <div className='flex items-center py-4 justify-between'>
    <div>
    <NavLink to="" className="flex flex-col">
     <span className='text-[1.5rem] bg-white rounded-md px-5 py-2  font-[700]'>VR<span className='text-[#0946EE]'>OO</span>MO</span>
      </NavLink>
    </div>
    <div>
        <span className='text-[1.3rem] text-gray-500'>Welcome ! {ownername} </span>
    </div>   
</div>
  )
}

export default OwnerNavbar