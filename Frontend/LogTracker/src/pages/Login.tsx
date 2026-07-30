import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
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
      alert(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

    return (

  <div className="relative min-h-screen overflow-hidden bg-[#090909]">
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
          backdrop-blur-sm
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

  {/* Background Blobs */}
  <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-orange-500/20 blur-[140px]" />
  <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-orange-600/10 blur-[160px]" />

  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="relative z-10 flex min-h-screen items-center justify-center px-6"
  >
    <div
      className="
        w-full
        max-w-md
        rounded-3xl
        border
        border-white/10
        bg-[#171717]/80
        p-8
        shadow-2xl
        backdrop-blur-xl
      "
    >
      <h1 className="text-center text-4xl font-bold text-white">
        Welcome Back
      </h1>

      <p className="mt-2 text-center text-gray-400">
        Login to continue your fitness journey.
      </p>

      <form onSubmit={handleLogin} className="mt-8 space-y-5">

        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          text="Login"
          type="submit"
          loading={loading}
        />
      </form>

      <div className="mt-8 text-center text-sm text-gray-400">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-orange-400 transition hover:text-orange-300"
        >
          Register
        </Link>
      </div>
    </div>
  </motion.div>
</div>
);

}