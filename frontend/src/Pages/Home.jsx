import React, { useEffect, useState } from 'react'
import Navbar from '@/Components/pagecomponents/Navbar'
import Backgroundimage from '../assets/background.avif'
import herosectionbg from '../assets/herosectionbg.jpg'
import CarDetailCard from '@/Components/pagecomponents/CarDetailCard'
import { NavLink } from 'react-router-dom'
import RentSteps from '@/Components/pagecomponents/RentSteps'
import TestiMonils from '@/Components/pagecomponents/TestiMonils'
import Footer from '@/Components/pagecomponents/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCars } from '@/Redux/CarSlice'
import CarDetailCardSkeleton from '@/Components/pagecomponents/CarDetailCardSkeleton'
import Aos from 'aos'
import 'aos/dist/aos.css'

const Home = () => {
  const {Cars,loading,error} = useSelector((state)=>state.Car)
  const AvailableCars = Cars.filter((Car)=>Car.status === "Available")
  // console.log(AvailableCars)
  const dispatch = useDispatch();


  // aos config
  useEffect(()=>{
    Aos.init({duration:1000});
  },[])

  // fetch cars
  useEffect(()=>{
    dispatch(fetchCars())
  },[dispatch])

  return (
    <>
      {/* section-1 */}
      <div className='w-full bg-center bg-cover'  style={{backgroundImage:`linear-gradient(to bottom, rgba(0,0,0,0) 70%, rgba(0,0,0,0.9)), url(${herosectionbg})`}}>
      <section className='w-full px-[2vw] py-2 sm:px-[4vw] sm:py-3 '>
        <Navbar />
        <div data-aos ="fade-down"  data-aos-easing="linear"
     data-aos-duration="1500" className='mt-8 p-4 md:p-10 md:mt-[21rem] '>
            <p  className='text-white font-[600] md:leading-[5.5rem] text-[2.5rem] md:text-[5rem]'> Drive more, worry less – <br /> convenient car rentals</p>
          </div>
      </section>
    </div>
    {/* section-2 */}
    <section className='px-[2vw] sm:px-[4vw] py-2 sm:py-3 w-full'>
      <div className=' flex flex-col md:px-10 md:py-10 px-5 py-3 w-full gap-5'>
         <h2 data-aos="fade-down" className='text-[1.8rem] sm:text-[2.5rem] font-[600] '>Top vehicle this month</h2>
         {/* cards */}
         {
          loading ? (
            <div className='flex justify-center items-center gap-7 flex-wrap'>
              {
                [...Array(6)].map((_,index)=>{
                  return (
                    <CarDetailCardSkeleton key={index} />
                  )
                })
              }
             </div> 
          ):Cars?.length > 0 ? (
             <div className='flex justify-center items-center gap-7 flex-wrap'>
              {
                AvailableCars?.slice(0,3).map((Car)=>{
                     return(
                      <CarDetailCard key={Car._id} Car={Car} /> 
                   )
                })
              }
             </div> 
          ):error ? (
             <p>{error}</p>
          ):(
            <div className='flex justify-center items-center mt-10'>
                            <p className='text-[#012047] dark:text-white text-[1.2rem]'>No Cars found</p>
            </div>
          )
         }
         <div className='flex justify-center items-center'>
            <NavLink to="/find-cars">
               <button type="button" className="px-10 py-3  rounded-md text-black font-[500] bg-[#F5F5F5] hover:bg-[#0946EE]  hover:text-white">
                Show More </button>
            </NavLink>
         </div>
      </div> 
    </section>
    {/* section-3 */}
    <RentSteps />
    <TestiMonils />
    <Footer />
    </>
 
  )
}

export default Home