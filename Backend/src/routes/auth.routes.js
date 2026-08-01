const express=require('express');

const router=express.Router();

const authMiddleware=require("../middleware/auth.middleware");

const {registeredUser,sendOTP,loginUser,refreshToken,logOut}=require("../controller/auth.contoller");
const {saveFoodLog,getFoodLog,getProgress,getStreak}=require("../controller/saveFoodLog")

const {generateAnalysis}=require("../controller/ai.contoller")

const {resetPassword}=require("../controller/resetPass")

router.post("/register",registeredUser);
router.post("/otp",sendOTP);
router.post("/login",loginUser);
router.post("/refresh",refreshToken);

router.post("/logout",authMiddleware,logOut);
router.post("/save",authMiddleware,saveFoodLog);

router.get("/getme",authMiddleware,(req,res)=>{
     res.status(200).json({
        success:true,
        user:req.user,
     })
})

router.get("/foodLog/:date",authMiddleware,getFoodLog)
router.get("/progress",authMiddleware,getProgress)
router.get("/streak",authMiddleware,getStreak)
router.post("/analysis",authMiddleware,generateAnalysis)

router.post("/reset-password",resetPassword);

module.exports=router;