import { motion } from "framer-motion";
import ShapeGrid from "./ShapeGrid";
import { Link } from "react-router-dom";


const Landing = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#09070c] text-white " >

      {/* ================= React Bits Background ================= */}
      <div className="absolute inset-0 z-0 blur-[1px] ">
        <ShapeGrid
          speed={0.45}
          squareSize={46}
          direction="diagonal"
          borderColor="rgba(255,255,255,0.08)"
          hoverFillColor="#ff6b35"
          shape="hexagon"
          hoverTrailAmount={5}
        />
      </div>

      {/* Small center glow */}
      <div className="absolute left-1/2 top-1/2 z-[1] h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[140px]" />

      {/* Hero */}
      <section className="pointer-events-none relative z-10 flex min-h-screen flex-col">

        {/* Navbar */}
        <nav className="pointer-events-auto flex items-center justify-between px-10 py-8">
          <h1 className="text-3xl font-black tracking-tight">
            NUTRI
            <span className="text-orange-500">LOG</span>
          </h1>

          <div className="flex items-center gap-10 text-sm font-medium text-zinc-400">
            <a href="#" className="transition hover:text-white">
              About
            </a>

            <a href="#" className="transition hover:text-white">
              Support
            </a>
          </div>
        </nav>

        {/* Hero */}
        <div className="pointer-events-auto flex flex-1 items-center justify-center px-6">

          <div className="max-w-5xl text-center">

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-orange-400">
                NOW IN BETA
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: .3 }}
              className="mt-8 text-6xl font-black uppercase leading-[0.82] tracking-tight text-white drop-shadow-[0_0_30px_rgba(255,120,60,0.25)] md:text-8xl lg:text-[8rem]"
            >
              DISCIPLINE
              <br />
              STARTS
              <br />
              HERE.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: .4 }}
              className="mx-auto mt-8 max-w-2xl text-xl text-zinc-400"
            >
              Transform your body, one bite at a time.
              <br />
              <b className="text-orange-400" > Eat. Track. Repeat.</b>
             
            </motion.p>

            <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.4 }}
  className="mt-12 flex justify-center gap-6"
>
  <Link to="/register">
    <button className="group rounded-full bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600 px-10 py-4 font-semibold text-white shadow-[0_0_30px_rgba(255,98,0,.45)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_27px_rgba(255,98,0,.7)] active:scale-95">
      <span className="flex items-center gap-2">
        Track Now
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </span>
    </button>
  </Link>

  <Link to="/login">
    <button className="rounded-full border border-zinc-700 bg-zinc-900/60 px-10 py-4 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-orange-500 hover:bg-orange-500/10 hover:text-orange-400 hover:shadow-[0_0_20px_rgba(255,98,0,.25)] active:scale-95">
      Login
    </button>
  </Link>
</motion.div>

          </div>

        </div>

        <footer className="pointer-events-auto pb-8 text-center text-[10px] uppercase tracking-[0.4em] text-zinc-600">
          © 2026 NutriLog Inc. / Built For Results
        </footer>

      </section>

    </div>
  );
};

export default Landing;