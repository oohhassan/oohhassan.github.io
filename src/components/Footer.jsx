import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative bg-white dark:bg-[#080e1a] border-t border-slate-200 dark:border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            className="text-xl font-black text-slate-900 dark:text-white tracking-tight"
          >
            Hassan<span className="text-violet-500">.</span>
          </motion.a>
          <p className="text-sm text-slate-400 dark:text-slate-600">
            &copy; {new Date().getFullYear()} Hassan Ijaz. All rights reserved.
          </p>
          <div className="flex gap-4">
            {[
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/oohhassan/', icon: 'in' },
              { label: 'GitHub', href: 'https://github.com/oohhassan', icon: 'GH' },
            ].map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.label}
                whileHover={{ y: -3, scale: 1.1 }}
                className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 flex items-center justify-center text-slate-500 text-xs font-bold hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-500/20 transition-all duration-300"
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
