import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"



const initialState = {
    Cars:[],
    loading:false,
    error:null,
}

export const fetchCars = createAsyncThunk("Car/fetchCars",async(_, rejectWithValue)=>{
   try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cars/all-cars`,{
        withCredentials:true
      })
      if(response.data){
        // console.log("response",response.data)
        return new Promise((resolve)=>{
            setTimeout(() => {
                resolve(response?.data?.data)
            }, 1000);
        })
        // return response?.data?.data
      }
    
   } catch (error) {
      return rejectWithValue(error?.response?.data?.mesage || "failed to fetch cars")
   }
})

export const CarSlice = createSlice({
    name:"Car",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchCars.pending,(state,action)=>{
            state.loading = true,
            state.error = null;
        })
        builder.addCase(fetchCars.fulfilled,(state,action)=>{
            state.Cars = action.payload
            state.loading = false;
            state.error = null;
        })
        builder.addCase(fetchCars.rejected,(state,action)=>{
            state.loading = false,
            state.error = action.payload
        })
    }
})

export default CarSlice.reducer