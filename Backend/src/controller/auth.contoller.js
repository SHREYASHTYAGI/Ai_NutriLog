const User=require('../models/user.model');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const sendEmail=require('../utils/sendEmail')
const tokenModel=require("../models/token")
const OTP =require('../models/otpModel')

const validator = require("validator");


const sendOTP = async (req, res) => {
    try {
        const {  email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email missing"
            });
        }
        if (!validator.isEmail(email)) {
    return res.status(400).json({
        message: "Invalid email"
    });
}


const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }


      const existingOtp= await OTP.findOne({email});

      if( existingOtp && Date.now()-existingOtp.lastSentAt.getTime()<60*1000){
         const remaining = Math.ceil((60000 - (Date.now() - existingOtp.lastSentAt.getTime())) / 1000);

        return res.status(429).json({
               success:false,
                remaining
         })
      }

        const otp = (Math.floor(100000 + Math.random() * 900000)).toString();

        await OTP.deleteMany({ email });

        const hashedOTP = await bcrypt.hash(otp,10);

await OTP.create({
    email,
    otp: hashedOTP,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    lastSentAt: new Date()
});

        await sendEmail(
            email,
            "OTP for Email Verification",
            `Your OTP is ${otp}`
        );

        res.status(200).json({
            message: "OTP sent successfully"
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};


const registeredUser=async(req,res)=>{
    try{
        const {name,email,password,otp}=req.body;
        if (!name || !email || !password || !otp) {
    return res.status(400).json({
        message: "All fields are required"
    });
}
if (!validator.isEmail(email)) {
    return res.status(400).json({
        message: "Invalid email"
    });
}

        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                message:"User already exists"
            })
        }

       const otpRecord = await OTP.findOne({email});

       if(!otpRecord){
         return res.status(400).json({
            message:"OTP not found"
         })
       }

       if(otpRecord.expiresAt<new Date()){
         await otp.deleteOne({email});
         return res.status(400).json({
            message:"OTP expired!"
         })
       }
        
       const isValidOTP = await bcrypt.compare(otp, otpRecord.otp);

if (!isValidOTP) {
    return res.status(400).json({
        message: "Invalid OTP"
    });
}    

        if(!validator.isStrongPassword(password)){
            return res.status(400).json({
           message: "Password does not meet the required strength."
})
        }

        const hashedPass=await bcrypt.hash(password,10);


        const user=await User.create({
            name,
            email,
            password:hashedPass
        });

       await OTP.deleteOne({ email });

        res.status(201).json({
            message:"User registered successfully",
            name:user.name,
            email:user.email
        })
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}

const loginUser=async(req,res)=>{

    try{
         const{email,password}=req.body;

         if (!email || !password) {
    return res.status(400).json({
        message: "Email and password are required"
    });
}

    const user=await User.findOne({email});
    if(!user){
        return res.status(400).json({
            message:"User with this email does not exists",
        })
    }

    const decodedPass=await bcrypt.compare(password,user.password);
    if(!decodedPass){
        return res.status(400).json({
            message:"Invalid password",
        })
    }

    const refreshToken=jwt.sign({
        id:user._id,

    },process.env.REF_SEC,{
        expiresIn:"7d"
    })

    const hashRefresh=await bcrypt.hash(refreshToken,10);

    //Saving refreshtoken in database
    await tokenModel.deleteMany({
    userId: user._id
    });

    await tokenModel.create({
    userId: user._id,
    token: hashRefresh,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
});

    const accessToken=jwt.sign({
        id:user._id,
        email:user.email,
    },process.env.ACC_SEC,{
        expiresIn:"15m"
    })

    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        maxAge:7*24*60*60*1000,
        sameSite:"strict"
    })

    res.cookie("accessToken",accessToken,{
        httpOnly:true,
        maxAge:15*60*1000,
        sameSite:"strict"
    })

    res.status(200).json({
    message: "User logged in successfully",
    user: {
        id: user._id,
        name: user.name,
        email: user.email
    } 
   });
    }
    catch(err){
        console.log(err.message);
    }



   
}

const refreshToken = async (req, res) => {
    try {

        // Get refresh token from cookie
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                message: "Refresh token missing"
            });
        }

        // Verify refresh token
        const decoded = jwt.verify(
            refreshToken,
            process.env.REF_SEC
        );

        // Find stored hashed token
        const storedToken = await tokenModel.findOne({
            userId: decoded.id
        });

        if (!storedToken) {
            return res.status(401).json({
                message: "Refresh token not found"
            });
        }

        // Compare original token with hashed token
        const isMatch = await bcrypt.compare(
            refreshToken,
            storedToken.token
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid refresh token"
            });
        }

        // Generate new access token
        const accessToken = jwt.sign(
            {
                id: decoded.id
            },
            process.env.ACC_SEC,
            {
                expiresIn: "15m"
            }
        );

        // Store new access token in cookie
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000
        });

        return res.status(200).json({
            message: "Access token refreshed successfully"
        });

    } catch (err) {
        return res.status(401).json({
            message: "Invalid or expired refresh token"
        });
    }
};

const logOut=async(req,res)=>{
    try{
          const oldrefreshToken=req.cookies.refreshToken;
          if(oldrefreshToken){
               try{
                  const decoded=jwt.verify(oldrefreshToken,process.env.REF_SEC);

                  await tokenModel.deleteMany({
                    userId:decoded.id
                  })
               }
              catch(err){
                 return res.status(500).json({
                 message: err.message
    });
}
          }
          res.clearCookie("accessToken");

        res.clearCookie("refreshToken");

        return res.status(200).json({
            message: "Logged out successfully"
        });
    }
    catch(err){
        console.log(err.message);
    }
}

module.exports={registeredUser,sendOTP,loginUser,refreshToken,logOut};