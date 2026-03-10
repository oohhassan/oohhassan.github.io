import { motion } from "framer-motion";
import { SectionTitle, FadeUp, FloatingElement } from "./Motion";
import { ExperienceBg } from "./SectionBg";

const items = [
  {
    role: "Web Developer",
    org: "Akvon IT Solutions",
    date: "Jul 2023 – Apr 2025",
    desc: "Developing and maintaining web applications. Implemented data pipelines, and developed front-end interfaces using React with PHP/Laravel back-end and MySQL databases.",
    tags: ["Data Analysis", "React", "PHP/Laravel", "MySQL"],
    icon: "📊",
  },
  {
    role: "Financial Market Analyst",
    org: "Self-Employed",
    date: "2021 – Present",
    desc: "Analysing crypto, forex, futures, and options markets using fundamental and technical analysis. Applying micro and macroeconomic indicators to develop data-driven trading strategies and market insights.",
    tags: ["Forex", "Crypto", "Technical Analysis", "Fundamentals"],
    icon: "📈",
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-24 bg-white dark:bg-[#0f172a] relative overflow-hidden"
    >
      <ExperienceBg />
      <FloatingElement
        className="absolute top-0 left-1/4 w-72 h-72 bg-violet-500/5 rounded-full blur-3xl"
        duration={5}
      />

      <div className="max-w-5xl mx-auto px-6 relative">
        <SectionTitle>Experience</SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, i) => (
            <FadeUp key={i} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative h-full rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 hover:border-violet-400/40 dark:hover:border-violet-500/30 shadow-sm dark:shadow-none hover:shadow-xl hover:shadow-violet-500/10 transition-colors duration-300 overflow-hidden"
              >
                {/* Top accent bar */}
                <div className="h-1 w-full bg-gradient-to-r from-violet-500 to-indigo-500 opacity-60 group-hover:opacity-100 transition-opacity" />

                <div className="p-6">
                  {/* Header row */}
                  <div className="flex items-start gap-4 mb-4">
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                      className="flex-shrink-0 w-12 h-12 rounded-xl bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/15 flex items-center justify-center text-2xl"
                    >
                      {item.icon}
                    </motion.div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors leading-tight">
                        {item.role}
                      </h3>
                      <p className="text-violet-600 dark:text-violet-400 font-semibold text-sm mt-0.5">
                        {item.org}
                      </p>
                    </div>
                  </div>

                  {/* Date badge */}
                  <div className="mb-4">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 border border-slate-200/60 dark:border-white/5">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                      {item.date}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-5">
                    {item.desc}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <motion.span
                        key={tag}
                        whileHover={{ scale: 1.08, y: -2 }}
                        className="text-[11px] font-semibold px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400 border border-violet-200 dark:border-violet-500/10 cursor-default"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
