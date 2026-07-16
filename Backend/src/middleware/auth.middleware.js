const jwt=require("jsonwebtoken");
const User=require('../models/user.model');

const authMiddleware=async(req,res,next)=>{
    try{
         
         const token=req.cookies.accessToken;
         if(!token){
            return res.status(401).json({
                message:"Access Denied due to missing token"
            })
         }

         const verified=jwt.verify(token,process.env.ACC_SEC);
         const user=await user.findById(verified.id);

         if(!user){
            return res.status(401).json({
                message:"User not found"
            })
         }
         
         req.user=user;

         next();
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}

module.exports=authMiddleware;