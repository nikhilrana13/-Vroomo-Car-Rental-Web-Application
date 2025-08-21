import mongoose from "mongoose";

const UserModel = mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    profilepic:{type:String,default:""},
    role:{type:String,enum:["Renter","Owner"],default:"Renter"},
    mybookings:[{type:mongoose.Schema.Types.ObjectId,ref:"Booking"}]
},{timestamps:true})

const User = mongoose.model("User",UserModel)
export default User