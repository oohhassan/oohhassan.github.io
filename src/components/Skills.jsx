import { useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionTitle, FloatingElement } from "./Motion";
import { SkillsBg } from "./SectionBg";

/* ── colour accents per category ── */
const catColors = {
  data: {
    dot: "bg-blue-400",
    border: "border-l-blue-400",
    tag: "text-blue-600 dark:text-blue-400",
  },
  finance: {
    dot: "bg-yellow-400",
    border: "border-l-yellow-400",
    tag: "text-yellow-600 dark:text-yellow-400",
  },
  dev: {
    dot: "bg-green-400",
    border: "border-l-green-400",
    tag: "text-green-600 dark:text-green-400",
  },
  tools: {
    dot: "bg-purple-400",
    border: "border-l-purple-400",
    tag: "text-purple-600 dark:text-purple-400",
  },
};

const categories = [
  { id: "all", label: "All Skills" },
  { id: "data", label: "Data & Analytics" },
  { id: "finance", label: "Financial Markets" },
  { id: "dev", label: "Development" },
  { id: "tools", label: "Tools & Platforms" },
];

const skills = [
  // Data & Analytics
  {
    name: "Python",
    category: "data",
    desc: "Data wrangling, ML pipelines, automation scripts",
  },
  {
    name: "SQL",
    category: "data",
    desc: "Complex queries, database design, performance tuning",
  },
  {
    name: "Power BI",
    category: "data",
    desc: "Interactive dashboards, DAX measures, data modelling",
  },
  {
    name: "Tableau",
    category: "data",
    desc: "Data storytelling, calculated fields, visual analytics",
  },
  {
    name: "Excel",
    category: "data",
    desc: "Pivot tables, VBA macros, advanced formulas",
  },
  {
    name: "Statistical Analysis",
    category: "data",
    desc: "Hypothesis testing, regression, probability",
  },
  {
    name: "Data Visualization",
    category: "data",
    desc: "Matplotlib, Seaborn, interactive chart design",
  },
  {
    name: "Machine Learning",
    category: "data",
    desc: "Model evaluation, feature engineering, supervised/unsupervised learning",
  },
  {
    name: "Pandas",
    category: "data",
    desc: "DataFrames, data cleaning, transformation pipelines",
  },
  {
    name: "Scikit-learn",
    category: "data",
    desc: "Classification, regression, clustering algorithms",
  },
  {
    name: "Plotly",
    category: "data",
    desc: "Interactive charts, dashboards, Dash web apps",
  },

  // Finance
  {
    name: "Technical Analysis",
    category: "finance",
    desc: "Chart patterns, indicators, price action trading",
  },
  {
    name: "Fundamental Analysis",
    category: "finance",
    desc: "Macro/micro economics, valuation models",
  },
  {
    name: "Crypto Markets",
    category: "finance",
    desc: "DeFi protocols, on-chain analysis, market structure",
  },
  {
    name: "Forex & Futures",
    category: "finance",
    desc: "Currency pairs, derivatives, risk management",
  },

  // Development
  {
    name: "React",
    category: "dev",
    desc: "Component architecture, hooks, state management",
  },
  {
    name: "PHP / Laravel",
    category: "dev",
    desc: "RESTful APIs, MVC patterns, authentication",
  },
  {
    name: "MySQL",
    category: "dev",
    desc: "Schema design, query optimisation, indexing strategies",
  },
  {
    name: "Tailwind CSS",
    category: "dev",
    desc: "Utility-first styling, responsive design systems",
  },

  // Tools & Platforms
  {
    name: "Git / GitHub",
    category: "tools",
    desc: "Version control, branching, team collaboration",
  },
];

/* ── animated skill card ── */
function SkillCard({ skill, index }) {
  const c = catColors[skill.category];
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25, delay: index * 0.03 }}
      whileHover={{ y: -4 }}
      className={`group relative rounded-xl bg-white dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200/80 dark:border-slate-700/50 hover:border-violet-400/40 dark:hover:border-violet-400/30 transition-colors duration-300 overflow-hidden cursor-default border-l-[3px] ${c.border}`}
    >
      {/* hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-violet-500/[0.04] via-transparent to-indigo-500/[0.04]" />

      <div className="relative px-5 py-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-semibold text-[15px] text-slate-800 dark:text-slate-100 group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors duration-300 leading-tight">
              {skill.name}
            </h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">
              {skill.desc}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── main component ── */
export default function Skills() {
  const [active, setActive] = useState("all");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  const filtered =
    active === "all" ? skills : skills.filter((s) => s.category === active);

  /* group for "All" view */
  const grouped =
    active === "all"
      ? categories
          .filter((c) => c.id !== "all")
          .map((cat) => ({
            ...cat,
            items: skills.filter((s) => s.category === cat.id),
          }))
      : null;

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 bg-white dark:bg-[#0f172a] relative overflow-hidden"
    >
      <SkillsBg />
      {/* Animated floating elements for professional visual interest */}
      <FloatingElement
        className="absolute -top-16 left-1/4 w-40 h-40 bg-violet-400/10 rounded-full blur-3xl animate-pulse"
        duration={6}
      />
      <FloatingElement
        className="absolute bottom-0 right-1/3 w-56 h-56 bg-indigo-400/10 rounded-full blur-2xl animate-pulse"
        duration={8}
      />
      <FloatingElement
        className="absolute top-1/2 left-0 w-24 h-24 bg-blue-400/10 rounded-full blur-2xl animate-pulse"
        duration={7}
      />

      <div className="max-w-5xl mx-auto px-6 relative">
        <SectionTitle>Skills &amp; Expertise</SectionTitle>

        {/* ── filter bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-1.5 mb-12 p-1.5 rounded-2xl bg-white/60 dark:bg-slate-800/40 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/40 max-w-fit mx-auto"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`relative px-4 py-2 text-[13px] font-medium rounded-xl transition-all duration-300 whitespace-nowrap ${
                active === cat.id
                  ? "text-white shadow-md"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
            >
              {active === cat.id && (
                <motion.div
                  layoutId="skillTab"
                  className="absolute inset-0 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-xl shadow-lg shadow-violet-500/20"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {cat.id !== "all" && (
                  <span
                    className={`inline-block w-1.5 h-1.5 rounded-full ${active === cat.id ? "bg-white/70" : catColors[cat.id]?.dot || ""}`}
                  />
                )}
                {cat.label}
              </span>
            </button>
          ))}
        </motion.div>

        {/* ── skills content with smooth crossfade ── */}
        <AnimatePresence mode="popLayout">
          {grouped ? (
            <motion.div
              key="all"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-10"
            >
              {grouped.map((group, gi) => (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: gi * 0.06 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className={`w-2 h-2 rounded-full ${catColors[group.id].dot}`}
                    />
                    <h3
                      className={`text-sm font-semibold uppercase tracking-wider ${catColors[group.id].tag}`}
                    >
                      {group.label}
                    </h3>
                    <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700/50" />
                    <span className="text-xs text-slate-400 dark:text-slate-500 tabular-nums">
                      {group.items.length}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {group.items.map((s, i) => (
                      <SkillCard key={s.name} skill={s} index={i} />
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
            >
              {filtered.map((s, i) => (
                <SkillCard key={s.name} skill={s} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── subtle stat ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 flex justify-center"
        >
          <div className="inline-flex items-center gap-6 px-6 py-3 rounded-full bg-white/60 dark:bg-slate-800/40 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/40">
            {categories
              .filter((c) => c.id !== "all")
              .map((cat) => (
                <div
                  key={cat.id}
                  className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${catColors[cat.id].dot}`}
                  />
                  <span className="font-medium">
                    {skills.filter((s) => s.category === cat.id).length}
                  </span>
                  <span className="hidden sm:inline">{cat.label}</span>
                </div>
              ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
