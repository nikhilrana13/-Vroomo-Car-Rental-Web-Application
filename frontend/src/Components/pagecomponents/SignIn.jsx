import React, { useState } from 'react'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import Signup from './Signup'
import { NavLink, useNavigate } from 'react-router-dom'
import { Dialog } from '@radix-ui/react-dialog'
import { useDispatch } from 'react-redux'
import { SetUser } from '@/Redux/AuthSlice'

const SignIn = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [open,setopen] = useState(false)
  const { register, handleSubmit, reset,formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        data,
        { withCredentials: true }
      )
      // console.log("response",response.data)
      if(response.data){
        toast.success(response?.data?.message)
        dispatch(SetUser(response?.data?.data?.account))
        localStorage.setItem("token",response?.data?.data?.token)
         if(response?.data?.data?.account?.role === "Renter"){
          navigate("/")
         }
         if(response?.data?.data?.account.role === "Owner"){
               navigate("/owner-dashboard/dashboard")
         }
        setopen(false)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
     <Dialog open={open} onOpenChange={setopen}>
      {/* Dialog open button */}
      <DialogTrigger asChild>
        <span>
          Sign In
        </span>
      </DialogTrigger>
      {/* Dialog content */}
      <DialogContent className="container sm:max-w-[575px] p-[4rem] h-[600px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[2rem]">Welcome Back!</DialogTitle>
          <DialogDescription className="text-gray-500 text-[1rem]">
            Sign up to access exclusive features and streamline your rental experience.
          </DialogDescription>
          <div className='p-4'>
            <p className='font-[600] text-[0.9rem]'>✔️ Save your details for quick and easy reservations</p>
            <p className='font-[600] text-[0.9rem]'> ✔️ View, modify, or cancel bookings anytime</p>
            <p className='font-[600] text-[0.9rem]'> ✔️ Bookmark cars and locations you love</p>
            <p className='font-[600] text-[0.9rem]'> ✔️Get recommendations based on history</p>
          </div>
        </DialogHeader>

        {/* Actual form */}
        <form onSubmit={handleSubmit(onSubmit)} // prevent dialog close on submit
          onClick={(e) => e.stopPropagation()} className="grid gap-4">
          <div className="grid gap-3">
            <label className='text-[1rem] font-[500]' htmlFor="email">Email</label>
            <input id="email" type="email" {...register("email", { required: true })} placeholder='Email' className='px-3 py-3 border rounded-md' />
            {errors.email && <span className="text-red-500">Email is required</span>}
          </div>

          <div className="grid gap-3">
            <label className='text-[1rem] font-[500]' htmlFor="password">Password</label>
            <input id="password" type="password" {...register("password", { required: true })} placeholder='Password' className='px-3 py-3 border rounded-md' />
            {errors.password && <span className="text-red-500">Password is required</span>}
          </div>
          <button type="submit" className="px-6 py-4 rounded-md bg-[#0946EE] font-[500] text-lg text-white">
            {loading ? <Loader2 className='mx-auto animate-spin w-5 h-5' /> :"Register Account"}
          </button>
          <div className='flex mt-5 items-center gap-2'>
            <p className='text-[1.3rem]'>Don't have an account?</p>
            <NavLink className="text-[#0946ee]">
              <Signup />
            </NavLink>
           
          </div>
        </form>
      </DialogContent>
    </Dialog>

  )
}

export default SignIn
