import { motion } from "framer-motion";

export default function AIScanner() {
  return (
    <div className="
      absolute inset-0
      overflow-hidden
      rounded-3xl
      bg-black/60
    ">

      {/* Grid */}
      <div
        className="
          absolute inset-0
          opacity-30
          bg-[linear-gradient(#ff8b4d22_1px,transparent_1px),
          linear-gradient(90deg,#ff8b4d22_1px,transparent_1px)]
          bg-[size:40px_40px]
        "
      />


      {/* Moving Scanner Line */}
      <motion.div
        className="
          absolute left-0 right-0
          h-[2px]
          bg-orange-400
          shadow-[0_0_20px_#ff8b4d]
        "
        animate={{
          top:["0%","100%","0%"]
        }}
        transition={{
          duration:2,
          repeat:Infinity,
          ease:"linear"
        }}
      />


      {/* Text */}
      <div className="
        relative z-10
        flex h-full
        items-center
        justify-center
        flex-col
      ">

        <p className="
          text-orange-400
          animate-pulse
          font-semibold
        ">
          AI ANALYZING
        </p>

        <p className="text-slate-400 mt-2">
          Processing nutrition data...
        </p>

      </div>

    </div>
  );
}