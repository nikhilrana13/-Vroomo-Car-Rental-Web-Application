import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { toast } from 'sonner';

const ManageBookings = () => {
  const [Bookings, Setbookings] = useState([])
  const [loading, setloading] = useState(false)
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setloading(true)
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/booking/owner/my-bookings`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }, withCredentials: true
        })
        // console.log("response", response.data)
        if (response.data) {
          Setbookings(response?.data?.data)
        }
      } catch (error) {
        console.log("failed to fetch bookings", error)
      } finally {
        setTimeout(() => {
          setloading(false)
        }, 1000);
      }
    }
    fetchBookings()
  }, [])
  // handle status update
  const handleUpdateStatus = async (id, status) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/booking/owner/update-booking-status/${id}`, { status: status }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }, withCredentials: true
      })
      if (response.data) {
        toast.success(response?.data?.message)
        //  Update bookings state 
        Setbookings(prevbooking => prevbooking.map((booking) => booking._id === id ? { ...booking, status: status } : booking))
      }

    } catch (error) {
      console.log("failed to update status", error)
      toast.error(error?.response?.data?.message || "Something went wrong")

    }

  }

  return (
    <div className='flex w-full p-3 md:p-10 flex-col gap-4'>
      <div className='flex flex-col gap-3'>
        <h3 className='text-[1.4rem] font-[600]'>Manage Bookings</h3>
        <p className='text-gray-500 font-[400]'>Track all customer bookings,approve or cancel requests And Manage booking statuses.</p>
      </div>
      {/* table of bookings */}
      <>
        {loading ? (
          <div className='mt-5 border rounded-md'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Car</TableHead>
                  <TableHead>Date Range</TableHead>
                  <TableHead>Total Price</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[1, 2, 3,4,5].map((i) => (
                  <TableRow key={i} className="animate-pulse">
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-24 bg-gray-300 rounded-md" />
                        <div className="h-4 w-32 bg-gray-300 rounded" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-40 bg-gray-300 rounded" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-20 bg-gray-300 rounded" />
                    </TableCell>
                    <TableCell>
                      <div className="h-8 w-28 bg-gray-300 rounded-md" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : Bookings?.length > 0 ? (
          <div className='mt-5 border rounded-md'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Car</TableHead>
                  <TableHead>Date Range</TableHead>
                  <TableHead className="">Total Price</TableHead>
                  <TableHead className="">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Bookings.map((Booking) => (
                  <TableRow key={Booking._id}>
                    <TableCell className="font-medium">
                      <div className='flex w-full gap-4 items-center'>
                        <Avatar className='hidden md:block'>
                          <AvatarImage
                            className="h-20 w-30 rounded-md"
                            src={Booking?.carId?.image || "/default-avatar.png"}
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <span className='flex text-gray-500'>{Booking?.carId?.Brand} {Booking.carId?.Model}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-500">
                      {Booking?.pickupdate?.slice(0, 10)} To {Booking?.returndate?.slice(0, 10)}
                    </TableCell>
                    <TableCell className=" text-gray-500 ">${Booking?.totalprice || 0}</TableCell>
                    <TableCell>
                      {/* show select input for update status  */}
                      {Booking?.status === "pending" ? (
                        <select onChange={(e) => handleUpdateStatus(Booking._id, e.target.value)} value={Booking?.status} className='py-2 cursor-pointer border px-3  rounded-md'>
                          <option value="pending">pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      ) : (
                        // Show span badge when not pending
                        <span
                          className={`px-3 py-1 rounded-md text-white font-medium ${Booking.status === "Confirmed"
                            ? "bg-green-500"
                            : Booking.status === "Cancelled"
                              ? "bg-red-500"
                              : "bg-gray-400"
                            }`}
                        >
                          {Booking.status}
                        </span>
                      )}

                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

          </div>

        ) : (
          <p className='text-center mt-12 text-gray-500'>No Bookings found</p>
        )}
      </>

    </div>
  )
}

export default ManageBookings