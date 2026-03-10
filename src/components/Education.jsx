import { motion } from "framer-motion";
import { SectionTitle, FadeUp, FloatingElement } from "./Motion";
import { EducationBg } from "./SectionBg";

const items = [
  {
    degree: "MSc Data Analytics",
    org: "University of Huddersfield, UK",
    date: "2025 – Present",
    desc: "Focusing on machine learning, statistical analysis, and data-driven decision making. Dissertation: Predicting CO₂ Savings of Energy Efficiency in UK Housing.",
    badge: "In Progress",
    icon: "🎓",
    highlights: [
      "Machine Learning",
      "Statistical Analysis",
      "Data Mining",
      "Big Data Analytics",
      "Data Visualisation",
      "Predictive Modelling",
      "Research Methods",
      "Python for Data Science",
    ],
  },
  {
    degree: "BS Computer Science",
    org: "University of Management & Technology, Pakistan",
    date: "2019 – 2023",
    desc: "Core coursework in Data Structures, Algorithms, Database Systems, and Software Engineering. Final Year Project: BidBazar (an online auction portal) acquired by a furniture auction company.",
    badge: "Completed",
    icon: "🏛️",
    highlights: [
      "Data Structures",
      "Algorithms",
      "Database Systems",
      "Software Engineering",
      "OOP",
      "Operating Systems",
      "Computer Networks",
      "Web Development",
      "Discrete Mathematics",
      "Linear Algebra",
      "Probability & Statistics",
    ],
  },
];

export default function Education() {
  return (
    <section
      id="education"
      className="py-24 bg-white dark:bg-[#0f172a] relative overflow-hidden"
    >
      <EducationBg />
      <FloatingElement
        className="absolute bottom-0 right-1/4 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl"
        duration={4}
      />

      <div className="max-w-5xl mx-auto px-6 relative">
        <SectionTitle>Education</SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, i) => (
            <FadeUp key={i} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative h-full rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 hover:border-indigo-400/40 dark:hover:border-indigo-500/30 shadow-sm dark:shadow-none hover:shadow-xl hover:shadow-indigo-500/10 transition-colors duration-300 overflow-hidden"
              >
                {/* Top accent bar */}
                <div className="h-1 w-full bg-gradient-to-r from-indigo-500 to-violet-500 opacity-60 group-hover:opacity-100 transition-opacity" />

                <div className="p-6">
                  {/* Header row */}
                  <div className="flex items-start gap-4 mb-4">
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                      className="flex-shrink-0 w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/15 flex items-center justify-center text-2xl"
                    >
                      {item.icon}
                    </motion.div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors leading-tight">
                        {item.degree}
                      </h3>
                      <p className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm mt-0.5">
                        {item.org}
                      </p>
                    </div>
                  </div>

                  {/* Date & Status */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 border border-slate-200/60 dark:border-white/5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                      {item.date}
                    </span>
                    <motion.span
                      whileHover={{ scale: 1.08 }}
                      animate={
                        item.badge === "In Progress"
                          ? { opacity: [1, 0.6, 1] }
                          : {}
                      }
                      transition={
                        item.badge === "In Progress"
                          ? { repeat: Infinity, duration: 2 }
                          : {}
                      }
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                        item.badge === "In Progress"
                          ? "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/15"
                          : "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/15"
                      }`}
                    >
                      {item.badge}
                    </motion.span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-5">
                    {item.desc}
                  </p>

                  {/* Highlight tags */}
                  <div className="flex flex-wrap gap-2">
                    {item.highlights.map((tag) => (
                      <motion.span
                        key={tag}
                        whileHover={{ scale: 1.08, y: -2 }}
                        className="text-[11px] font-semibold px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/10 cursor-default"
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
