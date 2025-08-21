
import mongoose from "mongoose";

const BookingModel = mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    carId:{type:mongoose.Schema.Types.ObjectId,ref:"Cars",required:true},
    pickupdate:{type:Date,required:true},
    returndate:{type:Date,required:true},
    status:{type:String,enum:['pending','Cancelled','Confirmed'],default:"pending"},
    totalprice:{type:Number,required:true,default:0}
},{timestamps:true})

const Booking = mongoose.model("Booking",BookingModel)
export default Booking