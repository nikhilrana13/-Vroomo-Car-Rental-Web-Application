
export const isOwner = async(req,res,next)=>{
    try {
        console.log("req.role",req.role);
        if(!req.role ||req.role !== "Owner"){
            return res.status(400).json({message:"You are not a owner"});
        }
        next();
    } catch (error) {
        console.log("error in isOwner middleware",error);
        return res.status(500).json({message:"internal server error"}); 
    }
} 