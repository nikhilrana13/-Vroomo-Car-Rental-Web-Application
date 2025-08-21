import mongoose from "mongoose";

const OwnerModel = mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    profilepic:{type:String,default:""},
    role:{type:String,default:"Owner"},
    mycars:[{type:mongoose.Schema.Types.ObjectId,ref:"Cars"}],
},{timestamps:true})

const Owner = mongoose.model("Owner",OwnerModel)
export default Owner