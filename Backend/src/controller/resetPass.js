const User=require("../models/user.model")
const OTP=require("../models/otpModel")
const sendEmail=require("../utils/sendEmail")
const crypto= require('crypto')

const resetPassword=async(req,res)=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    try{
    const {email}=req.body;
     if(!email){
        return res.status(400).json({
            success:false,
            message:"Email is Required"
        })
     }

     if(!emailRegex.test(email)){
        return res.status(400).json({
            success:false,
            message:"Please enter a valid email address"
        })
     }

     const isExisting = await User.findOne({email});

     if(!isExisting){
        return res.status(404).json({
            success:false,
            message:"User not found, please register first"
        })
     }

     //sending otp to email

     //gen otp

     await OTP.deleteMany({email});

      const otp= crypto.randomInt(100000,999999).toString();

      const hOtp=crypto.createHash("sha256").update(otp).digest("hex");
      await OTP.create({
        email,
        otp:hOtp,
        lastSentAt:new Date(),
        expiresAt: new Date(Date.now()+10*60*1000)
      })

      console.log("OTP saved")

      //sending otp

      await sendEmail(
         email,
         "NutiLog Password reset",
         `Your OTP for password reset is ${otp}.`
      )
      console.log("otp sent")

    return res.status(200).json({
        success:true,
        message:"OTP sent to your email"
    })

    }
    catch (err) {
    console.error(err);

    return res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
}
    
   

}

module.exports={resetPassword}