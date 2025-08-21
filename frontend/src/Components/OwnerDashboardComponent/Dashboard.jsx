import { Car, ChartArea, ChartBarIcon,DollarSign } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';

const Dashboard = () => {
  const [loading,setloading] = useState(false)
  const user = useSelector((state)=>state.Auth.user)
  const [Revenue,SetRevenue] = useState(0)
  const [Bookings,SetBookings] = useState(0)

  // fetch total revenue
  useEffect(()=>{
    const fetchRevenueAndBookings = async()=>{
      try {
        setloading(true)
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/booking/owner/total-revenue`,{
          headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },withCredentials:true
        })
        // console.log("response",response.data)
        if(response.data){
          SetRevenue(response?.data?.data?.totalRevenue)
          SetBookings(response?.data?.data?.totalBookings)
        }
      }catch (error) {
      console.log("failed to fetch revenue or bookings", error);
    }finally{
      setTimeout(() => {
        setloading(false)
      }, 1000);
    }
    }
     fetchRevenueAndBookings()
  },[])

  return (
    <div className='w-full flex p-10 flex-col  gap-5'>
      <div className='flex flex-col gap-3'>
        <h3 className='text-[1.4rem] font-[600]'>Owner Dashboard</h3>
        <p className='text-gray-500 font-[400]'>Monitor overall platform performance including total cars,bookings,revenue</p>

      </div>
       <div className="grid  grid-cols-1 md:grid-cols-3 gap-4">
      <MetricCard
        title="Total Cars"
        value= {user?.mycars.length || 0}
        icon={<Car className="h-8 w-8 text-blue-500" />}
        color="bg-blue-50"
        loading={loading}
      />
      <MetricCard
        title="Total Bookings"
        value= {Bookings || 0}
        icon={<ChartBarIcon className="h-8 w-8 text-green-500" />}
        color="bg-green-50"
        loading={loading}
      />
      <MetricCard
        title="Total Revenue"
        value= {Revenue || 0}
        icon={<DollarSign className="h-8 w-8 text-purple-500" />}
        color="bg-purple-50"
        loading={loading}
      />
    </div>
    </div>
  )
}

export default Dashboard


function MetricCard({ title, value, icon, color,loading }) {
  return (
    <Card className="overflow-hidden border-none shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
      <CardContent className={`p-0 ${color}`}>
        <div className="p-6 flex items-center justify-between">
            {loading ? (
            <div className="flex justify-between w-full animate-pulse">
              <div className="flex flex-col gap-2">
                <div className="h-4 w-24 bg-gray-300 rounded"></div>
                <div className="h-8 w-16 bg-gray-300 rounded"></div>
              </div>
              <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
            </div>
          ) : (
            <>
              <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <h3 className="text-2xl font-bold mt-1">{value}</h3>
              </div>
              <div className="rounded-full p-3 bg-white/80 shadow-sm">{icon}</div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}