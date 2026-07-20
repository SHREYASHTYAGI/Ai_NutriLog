import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Input from "../components/Input";
import Button from "../components/Button";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { checkA, setIsLoggedIn } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/login", {
        email,
        password,
      });

      await checkA();
      setIsLoggedIn(true);
      navigate("/dashboard");
    } catch (err: any) {
      console.log(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

    return (

  <div className="relative min-h-screen overflow-hidden bg-[#090909]">

    <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-orange-500/20 blur-[140px]" />

      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-orange-600/10 blur-[160px]" />

    <motion.div
              initial={{opacity:0,y:40}}
              animate={{opacity:1,y:0}}
              transition={{duration:0.6}}
              className="
              relative
              z-10
              mx-auto
              flex
              min-h-screen
              items-center
              justify-center
              px-6
              "
              >

      <h1 className="text-3xl font-bold text-white">
        Welcome Back
      </h1>

      <p className="mt-2 text-slate-400">
        Login to continue
      </p>

     <form onSubmit={handleLogin} className="mt-8 space-y-4">

     <Input
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
     />

     <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
     />

     <Button
        text="Login"
        type="submit"
        loading={loading}
     />

        </form>

     <div className="mt-6 text-center text-sm text-slate-400">
       Don't have an account?{" "}
       <Link
         to="/register"
         className="font-medium text-emerald-400 hover:text-emerald-300"
       >
    Register
     </Link>
   </div>

  </motion.div>

  </div>
);

}