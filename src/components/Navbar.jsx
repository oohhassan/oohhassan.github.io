import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

function CVModal({ open, onClose }) {
  if (!open) return null;
  // Dynamically determine the base path (for Vite base: '/portfolio/')
  let base = "/";
  if (
    window.__vite_plugin_react_preamble_installed__ &&
    window.location.pathname.includes("/portfolio/")
  ) {
    base = "/portfolio/";
  } else if (window.location.pathname.includes("/portfolio/")) {
    base = "/portfolio/";
  }
  const pdfPath = base + "Hassan_CV.pdf";
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-3xl w-full h-[80vh] flex flex-col relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xl"
          aria-label="Close CV preview"
        >
          ×
        </button>
        <iframe
          src={pdfPath}
          title="Hassan CV PDF"
          className="flex-1 w-full rounded-b-xl border-none"
          style={{ minHeight: "0", minWidth: "0" }}
        />
      </div>
    </div>
  );
}

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
  { label: "View CV", href: "/HassanIjaz_CV.pdf", external: true, modal: true },
];

function ThemeToggle() {
  const { dark, toggle } = useTheme();
  return (
    <motion.button
      onClick={toggle}
      aria-label="Toggle theme"
      whileHover={{ scale: 1.1, rotate: 15 }}
      whileTap={{ scale: 0.9, rotate: -15 }}
      className="relative w-10 h-10 rounded-xl flex items-center justify-center
        bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20
        transition-all duration-300 text-lg"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={dark ? "moon" : "sun"}
          initial={{ rotate: -180, opacity: 0, scale: 0 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 180, opacity: 0, scale: 0 }}
          transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
        >
          {dark ? "☀️" : "🌙"}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [cvOpen, setCVOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY + window.innerHeight * 0.35;
      let current = "";
      for (const l of links) {
        if (!l.href.startsWith("#")) continue; // Only handle section anchors
        const el = document.querySelector(l.href);
        if (el && el.offsetTop <= offset) current = l.href;
      }
      setActive(current);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl shadow-lg shadow-slate-200/30 dark:shadow-violet-500/5 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <motion.a
          href="#"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group"
        >
          <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            Hassan
            <motion.span
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{
                repeat: Infinity,
                duration: 2.5,
                ease: "easeInOut",
              }}
              className="text-violet-500"
            >
              .
            </motion.span>
          </span>
        </motion.a>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l, i) =>
            l.modal ? (
              <motion.button
                key={l.href}
                onClick={() => setCVOpen(true)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1 * i + 0.3,
                  type: "spring",
                  stiffness: 120,
                }}
                className="relative px-4 py-2 text-sm transition-colors group text-violet-700 dark:text-violet-300 font-semibold border border-violet-200 dark:border-violet-500/20 rounded-full ml-2 hover:bg-violet-50 dark:hover:bg-violet-500/10 hover:text-violet-900 dark:hover:text-white"
                style={{ marginLeft: 16 }}
              >
                {l.label}
              </motion.button>
            ) : l.external ? (
              <motion.a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1 * i + 0.3,
                  type: "spring",
                  stiffness: 120,
                }}
                className="relative px-4 py-2 text-sm transition-colors group text-violet-700 dark:text-violet-300 font-semibold border border-violet-200 dark:border-violet-500/20 rounded-full ml-2 hover:bg-violet-50 dark:hover:bg-violet-500/10 hover:text-violet-900 dark:hover:text-white"
                style={{ marginLeft: 16 }}
              >
                {l.label}
              </motion.a>
            ) : (
              <motion.a
                key={l.href}
                href={l.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1 * i + 0.3,
                  type: "spring",
                  stiffness: 120,
                }}
                className={`relative px-4 py-2 text-sm transition-colors group ${
                  active === l.href
                    ? "text-violet-600 dark:text-violet-400 font-medium"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {l.label}
                {active === l.href && (
                  <motion.span
                    layoutId="navIndicator"
                    className="absolute bottom-0 left-1/2 h-[2px] bg-violet-500 rounded-full"
                    style={{ width: 20, x: "-50%" }}
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  />
                )}
              </motion.a>
            ),
          )}
          <ThemeToggle />
        </nav>

        <div className="lg:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            className="relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={{ rotate: open ? 45 : 0, y: open ? 8 : 0 }}
              className="block w-6 h-0.5 bg-slate-900 dark:bg-white rounded-full"
            />
            <motion.span
              animate={{ opacity: open ? 0 : 1, scale: open ? 0 : 1 }}
              className="block w-6 h-0.5 bg-slate-900 dark:bg-white rounded-full"
            />
            <motion.span
              animate={{ rotate: open ? -45 : 0, y: open ? -8 : 0 }}
              className="block w-6 h-0.5 bg-slate-900 dark:bg-white rounded-full"
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[-1]"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 right-0 h-screen w-[75%] max-w-sm bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl flex flex-col gap-2 pt-24 px-8 border-l border-slate-200 dark:border-white/5"
            >
              {links.map((l, i) =>
                l.external ? (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ x: 80, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: i * 0.07 + 0.1,
                      type: "spring",
                      stiffness: 120,
                    }}
                    className="text-lg text-violet-700 dark:text-violet-300 font-semibold py-3 border-b border-slate-100 dark:border-white/5 transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </motion.a>
                ) : (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ x: 80, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: i * 0.07 + 0.1,
                      type: "spring",
                      stiffness: 120,
                    }}
                    className="text-lg text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 py-3 border-b border-slate-100 dark:border-white/5 transition-colors"
                  >
                    {l.label}
                  </motion.a>
                ),
              )}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
      <CVModal open={cvOpen} onClose={() => setCVOpen(false)} />
    </motion.header>
  );
}
