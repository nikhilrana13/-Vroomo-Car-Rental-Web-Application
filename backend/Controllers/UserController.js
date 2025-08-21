import User from "../Models/UserModel.js"
import { Response } from "../utils/ResponseHandler.js"
import sharp from "sharp"
import cloudinary from "../Config/Cloudinary.js"

export const GetUserProfile = async(req,res)=>{
    try {
        const userId = req.user 
        
        const user = await User.findById(userId)
        if(!user){
            return Response(res,400,'user not found')
        }
        return Response(res,200,'user profile',owner)
    } catch (error) {
        console.log("failed to get user profile",error)
        return Response(res,500,'internal server error')
    }
}
export const UpdateUserProfile = async(req,res)=>{
    try {
        const userId = req.user 
        const {username,email} = req.body
        const file = req.file
        
        const user = await User.findById(userId)
        if(!user){
            return Response(res,400,'user not found')
        }
        let profilepicurl = user.profilepic
        if(file){
                    const optimizedImage = await sharp(file.buffer).resize({width:500,height:400}).toFormat("jpeg").toBuffer();
                        const imagebase64 = `data:image/jpeg;base64,${optimizedImage.toString("base64")}`
                        // upload to cloudinary
                        const cloudresponse = await cloudinary.uploader.upload(imagebase64,{
                            folder:"vrommo-images",
                            resource_type:"image"
                        });
                        // get the secure url of the uploaded image
                         profilepicurl = cloudresponse.secure_url
        }
        const updatedUser = await User.findByIdAndUpdate(userId,{username,email,profilepic:profilepicurl},{new:true})
        return Response(res,200,'profile updated successfully',updatedUser)
    } catch (error) {
        console.log("failed to update user profile",error)
        return Response(res,500,'Internal server error') 
    }
}