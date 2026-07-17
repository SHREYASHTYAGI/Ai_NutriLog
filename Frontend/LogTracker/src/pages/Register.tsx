import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import api from "../api/axios";
import  {Link}  from "react-router-dom";


export default function Register(){

    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [otp,setOtp]=useState("");
    
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [cooldown, setCooldown] = useState(0);

const handleSentOTP = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await api.post("/otp", {
      email,
    });

    alert(response.data.message);

    setOtpSent(true);
    setCooldown(60); // <-- Start countdown

  } catch (error: any) {
    alert(error.response?.data?.message || error.message);

    if (error.response?.status === 429) {
      setCooldown(error.response.data.remaining);
    }
  } finally {
    setLoading(false);
  }
};
     
    const handleRegister=async(e:React.FormEvent)=>{
        e.preventDefault();
        setLoading(true);
        try{
              
            const response=await api.post('/register',{
                  name,
                  email,
                  password,
                  otp
            })
            alert(response.data.message)
             
        }
        catch(err:any){
            console.log(err.response?.data?.mesaage||err.message);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
          if(cooldown<=0) return;
          
          const timer=setInterval(()=>{
            setCooldown((e)=>e-1);
          },1000);

          return()=>clearInterval(timer);
    },[cooldown])


     


    return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">

        <div className="w-full max-w-md rounded-2xl bg-slate-900 p-8 shadow-2xl">

            <h1 className="text-3xl font-bold text-white">
                Create Account
            </h1>

            <p className="mt-2 text-slate-400">
                Join us today
            </p>

            <form  onSubmit={otpSent?handleRegister:handleSentOTP}  className="mt-8 space-y-4">
                 
                 {!otpSent?(
                <>
                    <Input placeholder="Email" value={email} 
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                    <Button
                      type="submit"
                      loading={loading}
                       text="Send OTP"
                    />
                 </>)
                 :
                 (<>
                     <Input
                       placeholder="Full Name"
                       value={name}
                       onChange={(e)=>setName(e.target.value)}
                     />

                      <Input
                       placeholder="Email"
                       value={email}
                       disabled
                       onChange={(e)=>setEmail(e.target.value)}
                     />

                      <Input
                       placeholder="password"
                       value={password}
                       onChange={(e)=>setPassword(e.target.value)}
                     />

                      <Input
                       placeholder="Enter OTP"
                       value={otp}
                       onChange={(e)=>setOtp(e.target.value)}
                     />

                     <Button
                        text="Create Account"
                        type="submit"
                        loading={loading}

                     />
                     <Button 
                     type="button"
                     onClick={handleSentOTP} 
                     disabled={cooldown > 0||loading} 
                      text={
                        cooldown > 0
                          ? `Resend OTP in (${cooldown}s)`
                          : "Resend OTP"
                      } />

                        
                 </>)}
            
            </form>

            <div className="mt-6 text-center text-sm text-slate-400">
               Already have an account?{" "}
                 <Link
                   to="/login"
                   className="font-medium text-emerald-400                hover:text-emerald-300"
                 >
                   Login
                 </Link>
               </div>

        </div>

    </div>
)
  


}