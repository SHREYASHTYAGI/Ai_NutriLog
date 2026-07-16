const express=require('express');

const router=express.Router();

const authMiddleware=require("../middleware/auth.middleware");

const {registeredUser,sendOTP,loginUser,refreshToken,logOut}=require("../controller/auth.contoller");

router.post("/register",registeredUser);
router.post("/otp",sendOTP);
router.post("/login",loginUser);
router.post("/refresh",refreshToken);
router.post("/logout",logOut);
module.exports=router;