import Owner from "../Models/OwnerModel.js"
import { Response } from "../utils/ResponseHandler.js"
import sharp from "sharp"
import cloudinary from "../Config/Cloudinary.js"





export const GetOwnerProfile = async(req,res)=>{
    try {
        const ownerId = req.user 
        
        const owner = await Owner.findById(ownerId)
        if(!owner){
            return Response(res,400,'Owner not found')
        }
        return Response(res,200,'Owner profile',owner)
    } catch (error) {
        console.log("failed to get owner profile",error)
        return Response(res,500,'internal server error')
    }
}
export const UpdateOwnerProfile = async(req,res)=>{
    try {
        const OwnerId = req.user 
        const {username,email} = req.body
        const file = req.file
        
        const owner = await Owner.findById(OwnerId)
        if(!owner){
            return Response(res,400,'Owner not found')
        }
        let imageurl = owner.image
        if(file){
                    const optimizedImage = await sharp(file.buffer).resize({width:500,height:400}).toFormat("jpeg").toBuffer();
                        const imagebase64 = `data:image/jpeg;base64,${optimizedImage.toString("base64")}`
                        // upload to cloudinary
                        const cloudresponse = await cloudinary.uploader.upload(imagebase64,{
                            folder:"vrommo-images",
                            resource_type:"image"
                        });
                        // get the secure url of the uploaded image
                         imageurl = cloudresponse.secure_url
        }
        const updatedOwner = await Owner.findByIdAndUpdate(OwnerId,{username,email,profilepic:imageurl},{new:true})
        return Response(res,200,'Owner updated successfully',updatedOwner)
    } catch (error) {
        console.log("failed to update owner",error)
        return Response(res,500,'Internal server error') 
    }
}
