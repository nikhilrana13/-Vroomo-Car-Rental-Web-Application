import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { NavLink, useParams } from 'react-router-dom'
import { ArrowLeft, Loader, Loader2, LocateIcon, LocationEdit, User2Icon } from 'lucide-react'
import unknowncar from "../../assets/fallbackcar.jpg"
import { LuFuel } from 'react-icons/lu'
import { TbManualGearboxFilled } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import CarDetailShimmer from './CarDetailShimmer'
import { toast } from 'sonner'

const CarDetails = () => {
  const [loading, setLoading] = useState(false)
  const [bookingLoading, setBookingLoading] = useState(false)
  const Carid = useParams()
  const id = Carid.id
  const navigate = useNavigate()
  const [Carinfo, SetCarinfo] = useState({})
  const [BookInput, setBookinput] = useState({
    pickupdate: '',
    returndate: ''
  })

  const handleInputChange = (e) => {
    setBookinput({...BookInput, [e.target.name]: e.target.value})
  }

  // fetch car info
  useEffect(() => {
    const GetCarinfo = async() => {
      try {
        setLoading(true)
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cars/car-details/${id}`, {
          withCredentials: true
        })
        if(response.data) {
          SetCarinfo(response?.data?.data)
        }
      } catch (error) {
        console.log("failed to fetch car details", error)
        toast.error("Failed to fetch car details")
      } finally {
        setTimeout(() => {
          setLoading(false)
        }, 1000);
      }
    }
    GetCarinfo()
  }, [id])

  // Validation function
  const validateBookingInput = () => {
    if (!BookInput.pickupdate || !BookInput.returndate) {
      toast.error("Both pickup date and return date are required")
      return false
    }

    const pickupDate = new Date(BookInput.pickupdate)
    const returnDate = new Date(BookInput.returndate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (pickupDate < today) {
      toast.error("Pickup date cannot be in the past")
      return false
    }

    if (returnDate <= pickupDate) {
      toast.error("Return date must be after pickup date")
      return false
    }
    return true
  }

  // handle car booking
  const BookingCar = async(carId) => {
    if (!validateBookingInput()) {
      return
    }
    try {
      setBookingLoading(true)
      const token = localStorage.getItem("token")
      if (!token) {
        toast.error("Please login to book a car")
        return
      }
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/booking/book-car`, {
        carId: carId,
        pickupdate: BookInput.pickupdate,
        returndate: BookInput.returndate
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      })
      if(response.data) {
        toast.success(response?.data?.message || "Car booked successfully!")
        navigate("/manage-bookings")
      }      
    } catch (error) {
      console.log("failed to book car", error)
      toast.error(error?.response?.data?.message || "Something went wrong")
    } finally {
      setBookingLoading(false)
    }
  }
  return (
    <div className='px-[2vw] md:px-[4vw] py-2 sm:py-3'>
      <div className="w-full mt-[3.4rem] p-3 md:px-[2.5rem] md:py-5">
        <NavLink to="/" className="flex items-center text-[1.3rem] text-gray-500 gap-2 cursor-pointer">
          <ArrowLeft /> Back to Home
        </NavLink>
      </div>
      {loading ? (
        <CarDetailShimmer />
      ) : Carinfo && Object.keys(Carinfo).length > 0 ? (
        <>
          <div className='p-5 md:p-10 flex flex-col md:flex-row gap-8 w-full'>
            {/* left side */}
            <div className='flex w-full md:w-[70%] flex-col gap-4'>
              <img 
                src={Carinfo?.image || unknowncar} 
                alt="car-image" 
                className='w-full h-[500px] object-cover rounded-md' 
              />
              <span className='font-[700] text-[1.5rem]'>{Carinfo?.Model || "NA"}</span>
              <span className='text-gray-500 font-[500]'>
                {Carinfo?.Category || "NA"}.{Carinfo?.Year || "NA"}
              </span>
              <hr className='my-3' />
              
              <div className='flex flex-col md:flex-row gap-4'>
                <div className='flex p-5 rounded-md flex-col items-center bg-slate-200 gap-3 w-full md:w-[200px] justify-center'>
                  <User2Icon className='text-[2rem]' />
                  <span className='font-[600]'>{Carinfo?.seatingcapacity || 0} Seats</span>
                </div>
                <div className='flex p-5 rounded-md flex-col items-center bg-slate-200 gap-3 w-full md:w-[200px] justify-center'>
                  <LuFuel className='text-[2rem]' />
                  <span className='font-[600]'>{Carinfo?.fueltype || "NA"}</span>
                </div>
                <div className='flex p-5 rounded-md flex-col items-center bg-slate-200 gap-3 w-full md:w-[200px] justify-center'>
                  <TbManualGearboxFilled className='text-[2rem]' />
                  <span className='font-[600]'>{Carinfo?.transmission || "NA"}</span>
                </div>
                <div className='flex p-5 rounded-md flex-col items-center bg-slate-200 gap-3 w-full md:w-[200px] justify-center'>
                  <LocationEdit className='text-[2rem]' />
                  <span className='font-[600]'>{Carinfo?.location || "NA"}</span>
                </div>
              </div>
              <div className='flex flex-col gap-3'>
                <span className='font-[600] text-[1.5rem]'>Description</span>
                <p className='text-gray-500'>{Carinfo?.Description || "NA"}</p>
              </div>
            </div>
            {/* right side */}
            <div className='bg-white shadow-md w-full h-[480px] md:w-[30%] rounded-md p-5 flex flex-col gap-3 border'>
              <div className='flex justify-between'>
                <span className='text-[1.4rem] font-[700]'>${Carinfo?.Dailyprice || "NA"}</span>
                <span className='text-gray-500 text-[1rem]'>per day</span>
              </div>
              <hr className='my-4' />
              <div className='py-5 flex flex-col gap-3'>
                <div className='flex flex-col gap-2'>
                  <label className='text-gray-500'>Pickup Date</label>
                  <input 
                    name="pickupdate" 
                    value={BookInput.pickupdate}
                    onChange={handleInputChange} 
                    required 
                    min={new Date().toISOString().split('T')[0]}
                    className='px-3 py-3 border cursor-pointer rounded-md' 
                    type='date' 
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <label className='text-gray-500'>Return Date</label>
                  <input 
                    name="returndate" 
                    value={BookInput.returndate}
                    onChange={handleInputChange} 
                    required 
                    min={BookInput.pickupdate || new Date().toISOString().split('T')[0]}
                    className='px-3 py-3 border cursor-pointer rounded-md' 
                    type='date' 
                  />
                </div>
              </div>
              
              <button 
                onClick={() => BookingCar(Carinfo?._id)} 
                type="button"  
                disabled={bookingLoading}
                className="px-5 py-3 cursor-pointer rounded-md bg-[#0946EE] text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {bookingLoading ? (
                  <>
                    <Loader2 className="animate-spin w-4 h-4" />
                    Booking...
                  </>
                ) : (
                  "Book Now"
                )}
              </button>
              <span className='text-gray-500 mt-5 text-center'>No credit card required to reserve</span>
            </div>
          </div>
        </>
      ) : (
        <p className='text-gray-500 mt-10 mx-auto text-center text-[1.3rem]'>No details found</p>
      )}
    </div>
  )
}

export default CarDetails