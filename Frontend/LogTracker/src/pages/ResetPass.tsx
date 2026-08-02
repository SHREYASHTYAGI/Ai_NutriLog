import api from "../api/axios";
import {useState} from "react";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  Mail,
  MessageSquareLock,
  KeyRound,
} from "lucide-react";

export default function ResetPass(){

    const [email,setEmail]=useState<string>("");
    const [loading,setLoading]=useState<boolean>(false);
    const [step,setStep]=useState<number>(1);
    const [otp,setOtp]=useState<string>("");
    const [newPass,setNewPass]=useState<string>("");


    const resetPass=async()=>{
     try{
        setLoading(true);
        
            const response=await api.post("/reset-password",{
                email
            })
            
           setStep(2);
         alert(response.data.message);
         
     }
     catch(err:any){
        alert(err.response?.data?.message||err.message);
     }
     finally{
        setLoading(false);
     }
    }

    const validateOTP=async()=>{
            try{
              setLoading(true);
                const response=await api.post("/validate-otp",{
                  email,otp
                })
                setStep(3);
                alert(response.data.message);
            }
            catch(err:any){
              alert(err.response?.data?.message||err.message);
            }
        finally{
        setLoading(false);
      }
    }

    const updatePass=async()=>{
      try{
        setLoading(true);
        const response=await api.post("/update-password",{
          email,
          password:newPass
        })
        alert(response.data.message);
        navigate("/login");

      }
      catch(err:any){
        alert(err.response?.data?.message||err.message);
      }
      finally{
        setLoading(false);
      }
    }

   const handleBtn=()=>{
      if(step===1){
        resetPass();
      }
      else if(step===2){
        validateOTP();
      }
      else if(step===3){
        updatePass();
      }
      
   }


   const navigate=useNavigate();


    return(
        <div className="flex min-h-screen items-center justify-center bg-[#0B0707] px-6">
  <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#171717] p-8 shadow-2xl">

    <div className="mb-8 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-500/15">
        <Mail className="h-8 w-8 text-orange-400" />
      </div>

      <h1 className="text-3xl font-bold text-white">
        Forgot Password
      </h1>

      <p className="mt-3 text-sm leading-6 text-zinc-400">
        Verify your Email 
      </p>
    </div>

   <div className="relative">
  <Mail
    size={20}
    className={`absolute left-4 top-1/2 -translate-y-1/2 text-orange-400 ${step>=2?"text-orange-400/55":""}`}
  />

  <input
    type="email"
    value={email}
    disabled={step >= 2}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="Email Address"
    className={`
      w-full
      rounded-2xl
      border
      py-4
      pl-12
      pr-4
      outline-none
      transition-all
      duration-300

      ${
        step >= 2
          ? "cursor-not-allowed border-green-500/30 bg-[#111111] text-zinc-400"
          : "border-white/10 bg-[#202020] text-white placeholder:text-zinc-500 focus:border-orange-500 focus:shadow-[0_0_10px_rgba(249,115,22,.2)]"
      }
    `}
  />
</div>
    <div>
        
        {step >= 2 && (
  <div className="relative mt-4">
    <MessageSquareLock
      size={20}
      className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400"
    />

    <input
      type="text"
      value={otp}
      onChange={(e) => setOtp(e.target.value)}
      placeholder="Enter OTP"
      disabled={step>=3}
      className={`
        w-full
        rounded-2xl
        border border-white/10
        bg-[#202020]
        py-4
        pl-12
        pr-4
        text-white
        placeholder:text-zinc-500
        outline-none
        transition
        duration-300
        focus:border-orange-500
        focus:shadow-[0_0_10px_rgba(249,115,22,.2)]
         ${
        step >= 3
          ? "cursor-not-allowed border-green-500/30 bg-[#111111] text-zinc-400"
          : "border-white/10 bg-[#202020] text-white placeholder:text-zinc-500 focus:border-orange-500 focus:shadow-[0_0_10px_rgba(249,115,22,.2)]"
      }
      `}
    />
  </div>
)}
        {step >= 3 && (
  <div className="relative mt-4">
    <KeyRound
      size={20}
      className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400"
    />

    <input
      type="password"
      value={newPass}
      onChange={(e) => setNewPass(e.target.value)}
      placeholder="Enter New Password"
      className="
        w-full
        rounded-2xl
        border border-white/10
        bg-[#202020]
        py-4
        pl-12
        pr-4
        text-white
        placeholder:text-zinc-500
        outline-none
        transition
        duration-300
        focus:border-orange-500
        focus:shadow-[0_0_10px_rgba(249,115,22,.2)]
      "
    />
  </div>
)}
    </div>

    <button
      onClick={handleBtn}
      disabled={loading}
      className="
        mt-6
        w-full
        rounded-2xl
        bg-linear-to-r
        from-orange-500
        to-orange-600
        py-4
        font-semibold
        text-white
        transition-all
        duration-300
        hover:scale-[1.02]
        hover:shadow-[0_0_7px_rgba(249,115,22,.4)]
        active:scale-95
        disabled:cursor-not-allowed
        disabled:opacity-60
      "
    >

      {/*ultimate button 😈*/}
     {step===2?loading?"Verifying...":"Verify OTP":step===3?loading?"Resetting...":"Reset Password":loading?"Sending...":"Send OTP"}

    </button>

    <p className="mt-6 text-center text-sm text-zinc-500">
      Remember your password?
      <Link
        to="/login"
        className="ml-2 font-medium text-orange-400 hover:text-orange-300"
      >
        Login
      </Link>
    </p>



  </div>
</div>
    )
}