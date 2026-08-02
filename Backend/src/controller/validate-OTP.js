const OTP=require("../models/otpModel");
const User=require("../models/user.model");
const bcrypt=require("bcrypt");

const crypto = require("crypto");

const validateOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const otpDoc = await OTP.findOne({ email });

    if (!otpDoc) {
      return res.status(404).json({
        success: false,
        message: "OTP not found",
      });
    }

    if (otpDoc.expiresAt < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }
    console.log("Entered OTP:", otp);

    const hashedOtp = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    if (hashedOtp !== otpDoc.otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP validated successfully",
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updatePass = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    // Password validation
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword }, // Change to Pass if that's your schema field
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

module.exports={validateOTP,updatePass}