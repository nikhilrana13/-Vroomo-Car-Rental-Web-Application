import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
const AddCar = () => {
  const [loading,setloading] = useState(false)
    const { register, handleSubmit, reset,formState: { errors } } = useForm() 
   const [image, setImage] = useState(null);

  //  for image preview
  const handleImageChange = (e) => {
    if(e.target.files && e.target.files[0]){
      setImage(URL.createObjectURL(e.target.files[0]))
    }
  };

  const onSubmit = async(data)=>{
    const formdata = new FormData()
     formdata.append("Brand",data.Brand)
     formdata.append("Model",data.Model)
     formdata.append("Year",data.Year)
     formdata.append("Dailyprice",data.Dailyprice)
     formdata.append("Category",data.Category)
     formdata.append("transmission",data.transmission)
     formdata.append("fueltype",data.fueltype)
     formdata.append("seatingcapacity",data.seatingcapacity)
     formdata.append("location",data.location)
     formdata.append("Description",data.Description)
     if(data.image && data.image[0]){
      formdata.append("image",data.image[0])
     }
    //  for(let pair of formdata.entries()){
    //   console.log(pair[0] + ","+ pair[1])
    //  }
    try {
      setloading(true)
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cars/add-car`,formdata,{
        headers:{
          Authorization : `Bearer ${localStorage.getItem("token")}`,
          "Content-Type":"multipart/form-data"
        },withCredentials:true
      })
      if(response.data){
        toast.success(response?.data?.message)
        reset()
        setImage(null)
      }
    } catch (error) {
      console.log("failed to add car",error)
      toast.error(error?.response?.data?.message || "Something went wrong")
    }finally{
      setTimeout(() => {
        setloading(false)
      }, 1000);
    }

  }
  return (
     <div className="max-w-2xl mx-5  bg-white shadow-lg rounded-2xl border p-10 mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Car</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1  gap-4">
        {/* Upload Image */}
        <div className='flex flex-col gap-2'>
          <label className="block font-medium">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full border rounded-lg p-2"
            {...register("image",{required:true, onChange: (e) => handleImageChange(e),})}
          />
          {image && (
            <img
              src={image}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded-lg"
            />
          )}
        </div>
        {errors.image && <span className='text-red-500'>Image is required</span>}

        {/* Brand */}
        <div className='flex flex-col gap-2'>
          <label className="block font-medium">Brand</label>
          <input
            type="text"
            placeholder="e.g. Maruti,Toyota,hyundai..."
            className="w-full border rounded-lg p-2"
            {...register("Brand",{required:true})}
          />
        </div>
        {errors.Brand && <span className='text-red-500'>Brand is required</span>}
        {/* Model */}
        <div className='flex flex-col gap-2'>
          <label className="block font-medium">Model</label>
          <input
            type="text"
            placeholder="e.g. vxi,zxi..."
            className="w-full border rounded-lg p-2"
            {...register("Model",{required:true})}
          />
        </div>
        {errors.Model && <span className='text-red-500'>Model is required</span>}

        {/* Year */}
        <div className='flex flex-col gap-2'>
          <label className="block font-medium">Year</label>
          <input
            type="number"
            placeholder="Enter year"
            className="w-full border rounded-lg p-2"
            {...register("Year",{required:true})}
          />
        </div>
        {errors.Year && <span className='text-red-500'>Year is required</span>}

        {/* Daily Price */}
        <div className='flex flex-col gap-2'>
          <label className="block font-medium">Daily Price ($)</label>
          <input
            type="number"
            placeholder="Enter price per day"
            className="w-full border rounded-lg p-2"
            {...register("Dailyprice",{required:true})}
          />
        </div>
        {errors.Dailyprice && <span className='text-red-500'>Daily Price is required</span>}
        {/* Category */}
        <div className='flex flex-col gap-2'>
          <label className="block font-medium">Category</label>
          <select {...register("Category",{required:true})} className="w-full border rounded-lg p-2"> 
            <option value="">Select Category</option>
            <option value="Suv">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Luxury">Luxury</option>
             <option value="Van">Van</option>
          </select>
        </div>
        {errors.Category && <span className='text-red-500'>Category is required</span>}

        {/* Transmission */}
        <div className='flex flex-col gap-2'>
          <label className="block font-medium">Transmission</label>
          <select {...register("transmission",{required:true})} className="w-full border rounded-lg p-2">
            <option value="">Select Transmission</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
        </div>
        {errors.transmission && <span className='text-red-500'>Transmission is required</span>}

        {/* Fuel Type */}
        <div className='flex flex-col gap-2'>
          <label className="block font-medium">Fuel Type</label>
          <select {...register("fueltype",{required:true})} className="w-full border rounded-lg p-2">
            <option value="">Select Fuel Type</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Cng">Cng</option>
          </select>
        </div>
        {errors.fueltype && <span className='text-red-500'>Fuel Type is required</span>}
        {/* Seating Capacity */}
        <div className='flex flex-col gap-2'>
          <label className="block font-medium">Seating Capacity</label>
          <input
            type="number"
            placeholder="Enter seating capacity"
            className="w-full border rounded-lg p-2"
            {...register("seatingcapacity",{required:true})}
          />
        </div>
        {errors.seatingcapacity && <span className='text-red-500'>Seating Capacity is required</span>}

        {/* Location */}
        <div className='flex flex-col gap-2'>
          <label className="block font-medium">Location</label>
          <input
            type="text"
            placeholder="Enter location"
            className="w-full border rounded-lg p-2"
            {...register("location",{required:true})}
          />
        </div>
         {errors.location && <span className='text-red-500'>Location is required</span>}
        {/* Description */}
        <div className='flex flex-col gap-2'>
          <label className="block font-medium">Description</label>
          <textarea 
            {...register("Description",{required:true})}
            placeholder="Enter description"
            rows={3}
            className="w-full border rounded-lg p-2"
          ></textarea>
        </div>
        {errors.Description && <span className='text-red-500'>Description is required</span>}
        {/* Submit Button */}
           <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          {
            loading ? <Loader2 className='mx-auto animate-spin w-5 h-5' /> :"Listing Car"
          }
        </button>       
      </form>
    </div>
  )
}

export default AddCar