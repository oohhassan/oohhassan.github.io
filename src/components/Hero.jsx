import { motion } from "framer-motion";
import HeroScene from "./HeroScene";

/* stagger container */
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.4 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 50, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const scaleFade = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-[#111b35]"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-50 dark:from-[#111b35] to-transparent" />
      </div>

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-[2] text-center px-6 max-w-3xl mx-auto"
      >
        {/* Badge */}
        <motion.div variants={scaleFade}>
          <span className="inline-flex items-center gap-2.5 px-5 py-2 mb-8 text-[11px] font-semibold tracking-[3px] uppercase text-violet-600 dark:text-violet-300/90 border border-violet-300/40 dark:border-violet-500/25 rounded-full bg-white/60 dark:bg-white/[0.04] backdrop-blur-md shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-violet-500" />
            </span>
            Data Analyst
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={fadeUp}
          className="text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold leading-[1.05] mb-5 tracking-tight"
        >
          <span className="text-slate-800 dark:text-white">Hassan </span>
          <motion.span
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
            style={{ backgroundSize: "200% 200%" }}
            className="bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-500 dark:from-violet-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent"
          >
            Ijaz
          </motion.span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          className="text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed font-light"
        >
          Data Analyst who understands{" "}
          <span className="text-violet-600 dark:text-violet-300 font-medium">
            markets, data, and risk
          </span>{" "}
          I turn complex data into{" "}
          <span className="text-indigo-600 dark:text-indigo-300 font-medium">
            insights that drive real business decisions
          </span>
          .
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          className="flex gap-4 justify-center flex-wrap"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-shadow duration-300"
          >
            Get In Touch
          </motion.a>
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3 rounded-full font-semibold text-slate-600 dark:text-slate-200 border border-slate-200 dark:border-white/15 hover:border-violet-400/50 dark:hover:border-violet-500/30 bg-white/50 dark:bg-white/[0.04] backdrop-blur-md hover:bg-violet-50/50 dark:hover:bg-violet-500/5 transition-all duration-300"
          >
            View Projects
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
