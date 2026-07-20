const express=require('express');

const router=express.Router();

const authMiddleware=require("../middleware/auth.middleware");

const {registeredUser,sendOTP,loginUser,refreshToken,logOut}=require("../controller/auth.contoller");
const {saveFoodLog}=require("../controller/saveFoodLog")

router.post("/register",registeredUser);
router.post("/otp",sendOTP);
router.post("/login",loginUser);
router.post("/refresh",refreshToken);

router.post("/logout",authMiddleware,logOut);
router.post("/save",authMiddleware,saveFoodLog);

router.get("/getme",authMiddleware,(req,res)=>{
     res.status(200).json({
        success:true,
        user:req.user
     })
})
module.exports=router;