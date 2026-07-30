import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, Ruler, ShieldCheck, User } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import api from "../api/axios";
import DotGrid from "../components/DotGrid";

import { Home } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [otp, setOtp] = useState("");

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
      setCooldown(60);
    } catch (error: any) {
      alert(error.response?.data?.message || error.message);

      if (error.response?.status === 429) {
        setCooldown(error.response.data.remaining);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/register", {
        name,
        email,
        password,
        weight: Number(weight),
        height: Number(height),
        otp,
      });

      alert(response.data.message);
      navigate("/login");
    } catch (err: any) {
      alert(err.response?.data?.message || err.message);
      console.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((value) => value - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const stepLabel = otpSent ? "Step 2 of 2" : "Step 1 of 2";
  const submitText = otpSent ? "Create Account" : "Send OTP";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#09070c] text-white">
     
      <div className="absolute inset-0">
        <DotGrid
          dotSize={10}
          gap={15}
          baseColor="#2a2c35"
          activeColor="#ff8b4d"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,107,53,0.22),_transparent_14%),linear-gradient(180deg,rgba(9,7,12,0.82),rgba(9,7,12,0.94))]" />
      </div>
          <Link
             to="/"
             className="
               absolute
               left-6
               top-6
               z-20
               flex
               items-center
               gap-2
               rounded-xl
               border
               border-orange-500/40
               bg-[#171717]/80
               px-3
               py-2
               text-gray-400
               backdrop-blur-md
               transition-all
               duration-300
               hover:border-orange-500/40
               hover:bg-orange-500/10
               hover:text-orange-400
             "
           >
             <Home size={18} />
             <span className="text-sm font-medium">Home</span>
        </Link>
      <div className="relative z-10 mx-auto flex min-h-screen items-center justify-center px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-3xl sm:p-10"
        >
          <div className="mb-8 space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.35em] text-orange-300 shadow-[0_0_20px_rgba(255,107,53,0.08)]">
              <span className="h-2 w-2 rounded-full bg-orange-400" />
              {stepLabel}
            </span>
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.35em] text-orange-300/90">Welcome aboard</p>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Create Account</h1>
              <p className="max-w-2xl text-sm leading-6 text-slate-300">Start tracking your nutrition today.</p>
            </div>
          </div>
             
          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:p-6">
             

            <form onSubmit={otpSent ? handleRegister : handleSentOTP} className="space-y-4">
              <AnimatePresence mode="wait">
                {otpSent ? (
                  <motion.div
                    key="register-form"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -24 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="space-y-4"
                  >
                    <div>
                      <label htmlFor="name" className="sr-only">Full name</label>
                      <div className="relative">
                        <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-orange-300/80" />
                        <Input
                          id="name"
                          name="name"
                          placeholder="Full Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="pl-12"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="sr-only">Email address</label>
                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-orange-300/80" />
                        <Input
                          id="email"
                          name="email"
                          placeholder="Email address"
                          value={email}
                          disabled
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-12"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="password" className="sr-only">Password</label>
                      <div className="relative">
                        <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-orange-300/80" />
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-12"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="weight" className="sr-only">Weight in kg</label>
                        <div className="relative">
                          <Ruler className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-orange-300/80" />
                          <Input
                            id="weight"
                            name="weight"
                            type="number"
                            placeholder="Weight (kg)"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className="pl-12"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="height" className="sr-only">Height in cm</label>
                        <div className="relative">
                          <ShieldCheck className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-orange-300/80" />
                          <Input
                            id="height"
                            name="height"
                            type="number"
                            placeholder="Height (cm)"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            className="pl-12"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="otp" className="sr-only">OTP code</label>
                      <div className="relative">
                        <ShieldCheck className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-orange-300/80" />
                        <Input
                          id="otp"
                          name="otp"
                          placeholder="Enter OTP"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          className="pl-12"
                        />
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="verify-form"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -24 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="space-y-4"
                  >
                    <div>
                      <label htmlFor="email" className="sr-only">Email address</label>
                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-orange-300/80" />
                        <Input
                          id="email"
                          name="email"
                          placeholder="Email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-12"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-3">
                <Button type="submit" loading={loading} text={submitText} />
                {otpSent && (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleSentOTP}
                    disabled={cooldown > 0 || loading}
                    text={cooldown > 0 ? `Resend OTP in (${cooldown}s)` : "Resend OTP"}
                  />
                )}
              </div>
            </form>
          </div>

          <div className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-white transition hover:text-orange-300">
              Login →
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
