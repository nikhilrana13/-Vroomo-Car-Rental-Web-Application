import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { NavLink, useNavigate } from 'react-router-dom'
import SignIn from './SignIn'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'


const Signup = () => {
  const [loading,setLoading] = useState(false)
  const {register,handleSubmit,formState: { errors }} = useForm()
  const [open,setopen] = useState(false)
  const onSubmit = async (data)=>{
    // console.log("formdata",data)
    try {
      setLoading(true)
      const response =  await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/sign-up`,data,{
        withCredentials:true
      })
      if(response.data){
         toast.success(response?.data?.message)
         setopen(false)
         setLoading(false)
      }
    } catch (error) {
      console.log("failed to sign up",error)
      setLoading(false)
      return toast.error(error?.response?.data?.message || "Something went wrong")
    }
  }
  return (
    <Dialog open={open} onOpenChange={setopen} >
      {/* Dialog open button */}
      <DialogTrigger asChild>
        <span>
          Sign Up
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
            <p className='font-[600] text-[0.9rem]'>✔️ View, modify, or cancel bookings anytime</p>
            <p className='font-[600] text-[0.9rem]'>✔️ Bookmark cars and locations you love</p>
            <p className='font-[600] text-[0.9rem]'>✔️ Get recommendations based on history</p>
          </div>
        </DialogHeader>

        {/* Actual form */}
        <form onSubmit={handleSubmit(onSubmit)} // prevent dialog close on submit
          onClick={(e) => e.stopPropagation()} className="grid gap-4">
          <div className="grid gap-3">
            <label className='text-[1rem] font-[500]' htmlFor="username">User Name</label>
            <input id="username" {...register("username", { required: true })} placeholder='Username' className='px-3 py-3 border rounded-md' />
            {errors.username && <span className="text-red-500">Username is required</span>}
          </div>

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
          <div className="grid gap-3">
            <label className='text-[1rem] font-[500]' htmlFor="role">Role</label>
            <select id="role" {...register("role", { required: true })} className='px-3 py-3 border rounded-md outline-none'>
              <option value="Renter">Renter</option>
              <option value="Owner">Owner</option>
            </select>
            {errors.role && <span className="text-red-500">Role is required</span>}
          </div>
          <button type="submit" className="px-6 py-4 rounded-md bg-[#0946EE] font-[500] text-lg text-white">
            {loading ? <Loader2 className='mx-auto animate-spin w-5 h-5' /> :"Register Account"}
          </button>
          <div className='flex mt-5 items-center gap-2'>
            <p className='text-[1.3rem]'>Already have an account?</p>
            <NavLink className="text-[#0946ee]">
               <SignIn /> 
            </NavLink>
           
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default Signup




