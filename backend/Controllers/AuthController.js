import User from "../Models/UserModel.js"
import { Response } from "../utils/ResponseHandler.js";
import bcrypt from "bcrypt"
import Owner from "../Models/OwnerModel.js";
import jwt from "jsonwebtoken"

export const SignUp = async(req,res)=>{
    try {
        const {username,email,password,role} = req.body;
        // check if user and owner already exists
        let user = await User.findOne({email});
        if(user){
            return Response(res,400,'User already exists')
        }
        let owner = await Owner.findOne({email})
        if(owner){
             return Response(res,400,'Owner already exists')
        }
        const hashpassword = await bcrypt.hash(password,10)
        if(role === 'Renter'){
            user = await User.create({
                username,email,password:hashpassword,role
            })
            return Response(res,200,'Signup successfully')
        }
        if(role === 'Owner'){
            owner = await Owner.create({
                email,password:hashpassword,role,username
            })
            return Response(res,200,'Signup successfully')
        }
    } catch (error) {
        console.log("failed to signup",error)
        return Response(res,500,'Internal server error')
    }
}

export const Login = async(req,res)=>{
    try {
        const {email,password} = req.body;
        // check if user or owner exists or not
    let account = await User.findOne({email})
        if(!account){
            account = await Owner.findOne({email})
            if(!account){
                return Response(res,400,'Account not found')
            }
        }
        const isMatched = await bcrypt.compare(password,account.password)
        if(!isMatched){
            return Response(res,400,'Invalid Credentials')
        }
        // generate jwt
        const token = jwt.sign({id:account._id,role:account.role},process.env.JWT_SECRET_KEY,{expiresIn:'1d'})
        res.cookie("token",token,{httpOnly:true,secure:true,sameSite:"none"})
        return Response(res,200,'Login successfully',{account,token})
    } catch (error) {
        console.log("failed to Login",error)
        return Response(res,500,'Internal server error')
    }
}

export const Logout = async(req,res)=>{
    try {
        res.clearCookie("token",{httpOnly:true,secure:true,sameSite:"none"})
        return Response(res,200,"Logout successfully")
    } catch (error) {
        console.log("error in logout",error);
        return res.status(500).json({message:"internal server error"});
    }
}