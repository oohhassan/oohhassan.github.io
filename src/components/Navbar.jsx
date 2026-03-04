import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#0f0a1e]/90 backdrop-blur-xl shadow-2xl shadow-indigo-500/5 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="relative group">
          <span className="text-2xl font-black tracking-tight text-white">
            Hassan<span className="text-indigo-400">.</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="relative px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors group">
              {l.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 group-hover:w-3/4 transition-all duration-300 rounded-full" />
            </a>
          ))}
          <a href="#contact" className="ml-4 px-5 py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 hover:-translate-y-0.5">
            Hire Me
          </a>
        </nav>

        <button className="lg:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <span className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[-1]" onClick={() => setOpen(false)} />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 right-0 h-screen w-[75%] max-w-sm bg-[#0f0a1e]/95 backdrop-blur-2xl flex flex-col gap-2 pt-24 px-8 border-l border-white/5"
            >
              {links.map((l, i) => (
                <motion.a key={l.href} href={l.href} onClick={() => setOpen(false)} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.05 + 0.1 }} className="text-lg text-gray-300 hover:text-white py-3 border-b border-white/5 transition-colors">
                  {l.label}
                </motion.a>
              ))}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
