import { motion } from 'framer-motion';
import HeroScene from './HeroScene';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0f0a1e]">
      <div className="absolute inset-0 z-0"><HeroScene /></div>
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-[#0f0a1e]/30 to-[#0f0a1e]" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_0%,#0f0a1e_70%)] opacity-40" />

      <div className="relative z-[2] text-center px-6 max-w-4xl">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-[3px] uppercase text-indigo-300 border border-indigo-500/30 rounded-full bg-indigo-500/10 backdrop-blur-sm">
            Data Analyst &bull; Financial Markets
          </span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] mb-4">
          Hassan <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">Ijaz</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }} className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Turning <span className="text-indigo-300 font-medium">raw data</span> into actionable insights & building <span className="text-violet-300 font-medium">data-driven solutions</span> for smarter decisions.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }} className="flex gap-4 justify-center flex-wrap">
          <a href="#contact" className="group relative px-8 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:shadow-2xl hover:shadow-indigo-500/30 transition-all duration-300 hover:-translate-y-0.5 overflow-hidden">
            <span className="relative z-10">Get In Touch</span>
          </a>
          <a href="/Hassan_Ijaz_CV.pdf" download className="px-8 py-3.5 rounded-full font-semibold text-white border border-white/20 hover:border-indigo-400/50 hover:bg-white/5 transition-all duration-300 hover:-translate-y-0.5 backdrop-blur-sm">
            ↓ Download CV
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <motion.div className="w-1 h-2 bg-indigo-400 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
