export default function Footer() {
  return (
    <footer className="relative bg-[#080515] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <a href="#" className="text-xl font-black text-white tracking-tight">
            Hassan<span className="text-indigo-400">.</span>
          </a>
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Hassan Ijaz. Built with React, Three.js & Tailwind CSS.
          </p>
          <div className="flex gap-4">
            {[
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/oohhassan/', icon: 'in' },
              { label: 'GitHub', href: 'https://github.com/oohhassan', icon: 'GH' },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label} className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center text-gray-500 text-xs font-bold hover:text-indigo-400 hover:border-indigo-500/20 transition-all duration-300">
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
