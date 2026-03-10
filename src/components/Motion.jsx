import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function SectionTitle({ children }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 0.7, type: 'spring', stiffness: 100 }}
      className="text-3xl md:text-4xl font-bold text-center mb-14 tracking-tight"
    >
      <span className="bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">
        {children}
      </span>
      <motion.span
        initial={{ width: 0 }}
        whileInView={{ width: 56 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        className="block h-1 bg-gradient-to-r from-violet-500 to-indigo-500 mx-auto mt-4 rounded-full"
      />
    </motion.h2>
  );
}

export function FadeUp({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.7, delay, type: 'spring', stiffness: 80, damping: 15 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SlideIn({ children, direction = 'left', delay = 0, className = '' }) {
  const x = direction === 'left' ? -80 : 80;
  return (
    <motion.div
      initial={{ opacity: 0, x }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.7, delay, type: 'spring', stiffness: 80, damping: 15 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.6, delay, type: 'spring', stiffness: 120, damping: 12 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({ children, className = '' }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '' }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40, scale: 0.9 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.6, type: 'spring', stiffness: 100, damping: 12 },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedBar({ level, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.5 });

  return (
    <div ref={ref} className="mt-3 h-1.5 w-full bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: `${level}%` } : { width: 0 }}
        transition={{ duration: 1.2, delay: delay + 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
      />
    </div>
  );
}

export function FloatingElement({ children, className = '', duration = 3 }) {
  return (
    <motion.div
      animate={{ y: [-8, 8, -8] }}
      transition={{ repeat: Infinity, duration, ease: 'easeInOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function PulsingDot({ className = '' }) {
  return (
    <motion.div className={`relative ${className}`}>
      <motion.div
        animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="absolute inset-0 rounded-full bg-violet-500/40"
      />
      <div className="relative w-full h-full rounded-full bg-violet-500" />
    </motion.div>
  );
}

export function HoverCard({ children, className = '' }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02, boxShadow: '0 20px 40px rgba(124, 58, 237, 0.1)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
