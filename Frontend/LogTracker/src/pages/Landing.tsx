import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ShapeGrid from "./ShapeGrid";
import "./NeonCursor.css";

const NeonCursor = () => {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({
      x: e.clientX,
      y: e.clientY,
    });
  }, []);

  const handleMouseDown = useCallback(() => {
    setIsClicking(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsClicking(false);
  }, []);

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target;

    if (!(target instanceof Element)) {
      return;
    }

    if (
      target.matches(
        'a, button, input, [data-hover="true"]'
      )
    ) {
      setIsHovering(true);
    }
  }, []);

  const handleMouseOut = useCallback((e: MouseEvent) => {
    const target = e.target;

    if (!(target instanceof Element)) {
      return;
    }

    if (
      target.matches(
        'a, button, input, [data-hover="true"]'
      )
    ) {
      setIsHovering(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, [
    handleMouseMove,
    handleMouseDown,
    handleMouseUp,
    handleMouseOver,
    handleMouseOut,
  ]);

  return (
    <div className="neon-cursor-container">
      {/* Main cursor */}
      <motion.div
        className="cursor-main"
        animate={{
          x: position.x - 10,
          y: position.y - 10,
          scale: isClicking ? 0.8 : isHovering ? 1.2 : 1,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 400,
          mass: 0.5,
        }}
      />

      {/* Trail */}
      <motion.div
        className="cursor-trail"
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          scale: isHovering ? 1.4 : 1,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
          mass: 0.8,
        }}
      />

      {/* Glow */}
      <motion.div
        className="cursor-glow"
        animate={{
          x: position.x - 30,
          y: position.y - 30,
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 0.4,
        }}
        transition={{
          type: "spring",
          damping: 40,
          stiffness: 150,
          mass: 1,
        }}
      />
    </div>
  );
};

const Landing = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#09070c] text-white">

      {/* Background */}
      <div className="absolute inset-0 z-0 blur-[1px]">
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

      {/* Center Glow */}
      <div className="absolute left-1/2 top-1/2 z-[1] h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[140px]" />

      {/* Cursor */}
      <NeonCursor />

      {/* Hero */}
      <section className="relative z-10 flex min-h-screen flex-col">

        {/* Navbar */}
        <nav className="flex items-center justify-between px-6 py-6 sm:px-10 sm:py-8">
          <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
            NUTRI
            <span className="text-orange-500">LOG</span>
          </h1>

          <div className="flex items-center gap-6  duration-300 ease-in-out text-2xl hover:scale-125 transition-transform  animate-bounce font-medium text-zinc-400 sm:gap-10">
            <a
              href="https://github.com/SHREYASHTYAGI"
              target="blank"
              className="transition hover:text-white"
            >
              {"</>"}
            </a>
          </div>
        </nav>

        {/* Main Hero */}
        <div className="flex flex-1 items-center justify-center px-6">

          <div className="max-w-5xl text-center">

            {/* Beta badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span
                data-hover="true"
                className="
                  inline-block
                  rounded-full
                  border
                  border-orange-500/30
                  bg-orange-500/10
                  px-5
                  py-2
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.3em]
                  text-orange-400
                "
              >
                Now In Beta
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="
                mt-8
                text-6xl
                font-black
                uppercase
                leading-[0.82]
                tracking-tight
                text-white
                drop-shadow-[0_0_30px_rgba(255,120,60,0.25)]
                md:text-8xl
                lg:text-[8rem]
              "
            >
              DISCIPLINE
              <br />
              STARTS
              <br />
              HERE.
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mx-auto mt-8 max-w-2xl text-lg text-zinc-400 sm:text-xl"
            >
              Transform your body, one bite at a time.
              <br />
              <b className="text-orange-400">
                Eat. Track. Repeat.
              </b>
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-12 flex flex-col justify-center gap-4 sm:flex-row sm:gap-6"
            >
              <Link to="/register">
                <button
                  data-hover="true"
                  className="
                    group
                    w-full
                    rounded-full
                    bg-gradient-to-r
                    from-orange-500
                    via-orange-400
                    to-orange-600
                    px-10
                    py-4
                    font-semibold
                    text-white
                    shadow-[0_0_30px_rgba(255,98,0,.45)]
                    transition-all
                    duration-300
                    hover:scale-105
                    hover:shadow-[0_0_27px_rgba(255,98,0,.7)]
                    active:scale-95
                    sm:w-auto
                  "
                >
                  <span className="flex items-center justify-center gap-2">
                    Track Now

                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </button>
              </Link>

              <Link to="/login">
                <button
                  data-hover="true"
                  className="
                    w-full
                    rounded-full
                    border
                    border-zinc-700
                    bg-zinc-900/60
                    px-10
                    py-4
                    font-semibold
                    text-white
                    backdrop-blur-md
                    transition-all
                    duration-300
                    hover:scale-105
                    hover:border-orange-500
                    hover:bg-orange-500/10
                    hover:text-orange-400
                    hover:shadow-[0_0_20px_rgba(255,98,0,.25)]
                    active:scale-95
                    sm:w-auto
                  "
                >
                  Login
                </button>
              </Link>
            </motion.div>

          </div>
        </div>

        {/* Footer */}
        <footer className="pb-6 text-center text-[10px] uppercase tracking-[0.4em] text-zinc-600 sm:pb-8">
          © 2026 NutriLog Inc. / Built For Results
        </footer>

      </section>
    </div>
  );
};

export { NeonCursor };
export default Landing;