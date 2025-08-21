import mongoose from "mongoose";

const CarModel = mongoose.Schema({
    ownerId:{type:mongoose.Schema.Types.ObjectId,ref:"Owner",required:true},
    Brand:{type:String,required:true},
    Model:{type:String,required:true},
    Year:{type:String,required:true},
    Dailyprice:{type:Number,required:true},
    Category:{type:String,enum:["Suv","Sedan","Hatchback","Van","Luxury"],required:true},
    transmission:{type:String,enum:["Manual","Automatic"],required:true},
    fueltype:{type:String,enum:["Petrol","Diesel","Cng","Electric"],required:true},
    seatingcapacity:{type:Number,required:true},
    location:{type:String,required:true},
    Description:{type:String,required:true},
    status:{type:String,enum:["Available","Unavailable"],default:"Available"},
    image:{type:String,required:true,default:""}
})
const Cars = mongoose.model("Cars",CarModel)
export default Cars 