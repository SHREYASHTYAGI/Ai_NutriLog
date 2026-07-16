import React, { useState } from "react";
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

    const handleSentOTP=async(e:React.FormEvent)=>{
        e.preventDefault();
        setLoading(true);

        try{
            const response=await api.post("/otp",{
                email
            })
           alert(response.data.message);
            setOtpSent(true);

        }
        catch(error:any){
        alert(error.response?.data?.message || error.message);
        }
        finally{
            setLoading(false);
        }
    }
     
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
                    <Button type="submit" text="Send OTP" loading={loading} ></Button>
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