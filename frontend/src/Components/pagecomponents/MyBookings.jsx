import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import BookingDetailCard from './BookingDetailCard'
import axios from 'axios'
import BookingDetailShimmer from './BookingDetailShimmer'
import Footer from './Footer'

const MyBookings = () => {
  const [loading,setLoading] = useState(false)
   const [Bookings,SetBookings] = useState([])

  //  fetch bookings 
  useEffect(()=>{
    const fetchBookings = async()=>{
     try {
      setLoading(true)
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/booking/my-bookings`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },withCredentials:true
      })
      // console.log("response",response?.data)
      if(response.data){
        SetBookings(response?.data?.data)
      }
    } catch (error) {
      console.log("failed to fetch bookings",error)
    }finally{
      setTimeout(() => {
        setLoading(false)
      }, 1000);
    }
    }
    fetchBookings()
  },[])
  // console.log("bookings",Bookings)

  return (
    <>
     <div className='px-[2vw] md:px-[4vw] py-2 sm:py-3'>
      <Navbar />
      <div className='p-5 md:p-10  flex flex-col gap-4 w-full'>
         <div className='flex p-3 md:p-7 flex-col  gap-3 '>
           <h4 className='text-[2rem] font-[700]'>My Bookings</h4>
           <p className='text-gray-500 font-[400]'>View and manage your all car bookings</p>

         </div>
         {/* booking cards */}
         <div className=' p-3 md:p-7 flex flex-col gap-4'>
            {
              loading ? (
                  [...Array(4)].map((_,index)=>{
                    return (
                      <BookingDetailShimmer key={index} />
                    )
                  })
              ):Bookings?.length > 0 ? (
                Bookings?.map((booking,index)=>{
                  return (
                     <BookingDetailCard key={booking?._id} index={index + 1} model={booking.carId?.Model} image={booking?.carId?.image} location={booking?.carId?.location} year={booking?.carId?.Year} totalprice={booking?.totalprice} createdat={new Date(booking?.createdAt).toLocaleDateString('en-GB')} pickupdate={new Date(booking?.pickupdate).toLocaleDateString('en-GB')} category={booking?.carId?.Category} returndate={new Date(booking?.returndate).toLocaleDateString('en-GB')} status={booking.status}  />
                  )
                })
              ):(
                <p className='text-gray-500 text-center'>No Bookings found</p>
              )
            }
         </div>
      </div>
    </div>
    <Footer />
    </>
   
  )
}

export default MyBookings