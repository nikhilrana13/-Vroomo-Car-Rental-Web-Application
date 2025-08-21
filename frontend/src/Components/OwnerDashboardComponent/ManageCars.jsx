import React, { useEffect, useState } from 'react'
import { DeleteIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from '../ui/button';
import { NavLink, Outlet } from 'react-router-dom';
import { toast } from 'sonner';


const ManageCars = () => {
  const [loading, setloading] = useState(false)
  const [Cars, SetCars] = useState([])

  // fetch cars 
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setloading(true)
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cars/my-cars`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")} `
          }, withCredentials: true
        })
        // console.log("my cars", response.data)
        if (response.data) {
          SetCars(response?.data.data)
        }
      } catch (error) {
        console.log("failed to get cars", error)
      } finally {
        setTimeout(() => {
          setloading(false)
        }, 1000)
      }
    }
    fetchCars()
  }, [])

 // handle delete
 const DeleteCar = async(id)=>{
     try {
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/cars/delete-car/${id}`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },withCredentials:true
      })
      if(response.data){
        toast.success(response?.data?.message)
          SetCars(Cars.filter((car)=> car._id !== id))
     }
     } catch (error) {
      console.log("failed to delete car",error)
      toast.error(error?.data?.response?.message || "Something went wrong")      
     }
 }
  return (
    <div className='flex w-full p-3 md:p-10 flex-col gap-4'>
      <div className='flex flex-col gap-3'>
        <h3 className='text-[1.4rem] font-[600]'>Manage Cars</h3>
        <p className='text-gray-500 font-[400]'>View all listed cars,update their details, or remove them from the booking platform</p>
      </div>
      {/* table of bookings */}
      <>
        {loading ? (
          <div className='mt-5 border rounded-md'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[3000px]">Car</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="">Status</TableHead>
                  <TableHead className="">Update Details</TableHead>
                  <TableHead className="">Delete</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[1, 2, 3,4,5].map((i) => (
                  <TableRow key={i} className="animate-pulse">
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <div className="h-20 w-27 bg-gray-300 rounded-md" />
                        <div className="h-4 w-32 bg-gray-300 rounded" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-20 bg-gray-300 rounded" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-20 bg-gray-300 rounded" />
                    </TableCell>
                    <TableCell>
                      <div className="h-8 w-28 bg-gray-300 rounded-md" />
                    </TableCell>
                    <TableCell>
                      <div className="h-8 w-28 bg-gray-300 rounded-md" />
                    </TableCell>
                    <TableCell>
                      <div className="h-8 w-10 bg-gray-300 rounded-md" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : Cars?.length > 0 ? (

          <div className='mt-5 border rounded-md'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Car</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="">Price</TableHead>
                  <TableHead className="">Status</TableHead>
                  <TableHead className="">Update Details</TableHead>
                  <TableHead className="">Delete</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Cars.map((Car) => {
                  //  console.log("Car object:", Car);
                  return (
                    <TableRow key={Car._id}>
                      <TableCell className="font-medium">
                        <div className='flex w-full gap-4 items-center'>
                          <Avatar className='hidden md:block'>
                            <AvatarImage
                              className="h-20 w-30 rounded-md"
                              src={Car?.image || "/default-avatar.png"}
                            />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <div className='flex flex-col gap-2'>
                            <span className='flex text-gray-500'>{Car?.Brand} {Car?.Model}</span>
                            <span className='flex text-gray-500'>{Car?.seatingcapacity}.{Car?.transmission}</span>
                          </div>

                        </div>
                      </TableCell>
                      <TableCell className="text-gray-500">
                        {Car?.Category}
                      </TableCell>
                      <TableCell className=" text-gray-500 ">${Car?.Dailyprice || 0}/Day</TableCell>
                      <TableCell>
                        <span
                          className={`px-3 py-1 rounded-md text-white font-medium ${Car?.status === "Available"
                            ? "bg-green-500"
                            : Car.status === "Unavailable"
                              ? "bg-red-500"
                              : "bg-gray-400"
                            }`}
                        >
                          {Car?.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <NavLink to={`/owner-dashboard/update-car-details/${Car._id}`}>
                          <Button>Update</Button>
                        </NavLink>
                      </TableCell>
                      <TableCell>
                        <DeleteIcon onClick={()=>DeleteCar(Car._id)} className='cursor-pointer' />
                      </TableCell>
                    </TableRow>
                  )
                })}

              </TableBody>
            </Table>

          </div>
        ) : (
          <p className='text-center mt-12 text-gray-500'>No Cars found</p>
        )}
      </>
      {/* update form */}
      <div>
        <Outlet />
      </div>


    </div>
  )
}

export default ManageCars