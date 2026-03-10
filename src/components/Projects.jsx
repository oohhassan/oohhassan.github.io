import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionTitle, StaggerContainer, StaggerItem, FloatingElement } from './Motion';
import { ProjectsBg } from './SectionBg';

const projects = [
  {
    title: 'CO₂ Savings Prediction Model',
    field: 'Machine Learning & Data Analytics',
    description:
      'MSc dissertation project — built a machine learning pipeline to predict CO₂ savings from energy-efficiency measures in UK housing using Python, Pandas, and Scikit-learn with real government datasets.',
    details: [
      'Collected and cleaned large-scale UK government energy datasets',
      'Performed exploratory data analysis and feature engineering',
      'Trained and evaluated multiple ML models (Random Forest, XGBoost, Linear Regression)',
      'Achieved strong predictive accuracy for CO₂ savings estimation',
      'Visualised results with Matplotlib and Seaborn for stakeholder reporting',
    ],
    tags: ['Python', 'Scikit-learn', 'Pandas', 'Data Analytics', 'Machine Learning'],
  },
  {
    title: 'Campvine CMS',
    field: 'Backend Development & Database Design',
    description:
      'Built a custom Content Management System for Campvine (client: Mike Gamble, Australia) using Laravel, React, Inertia.js, and MySQL designed to streamline content management and online publishing.',
    details: [
      'Designed & developed the backend in Laravel with clean, scalable architecture',
      'Built relational database schema in MySQL from scratch for dynamic content, user roles, and media',
      'Implemented REST-style routes and Inertia-based endpoints for seamless frontend rendering',
      'Enforced role-based authentication, authorization, and secure user sessions',
      'Delivered a fast, secure CMS enabling the content team with a modern editing workflow',
    ],
    tags: ['Laravel', 'React', 'Inertia.js', 'MySQL', 'REST API'],
  },
  {
    title: 'BidBazar — Online Auction Portal',
    field: 'Full-Stack Web Development',
    description:
      'BSc final-year project at UMT — built an online auction portal that handled real user traffic and was later acquired by a furniture auction company. Led the backend using JavaScript, MongoDB, and MVC architecture.',
    details: [
      'Designed and implemented the full backend with JavaScript and MongoDB',
      'Built user authentication, bid placement, and admin management features',
      'Developed timer-enabled auction closure for fair bidding',
      'Applied MVC architecture and efficient data structures for scalability',
      'Project saw heavy user interaction and was acquired by a furniture auction company',
    ],
    tags: ['JavaScript', 'MongoDB', 'MVC', 'Data Structures', 'Backend'],

  },
];

function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: 40 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl shadow-violet-500/10"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between p-6 pb-4 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-white/5 rounded-t-2xl">
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl font-bold text-slate-900 dark:text-white"
            >
              {project.title}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="text-sm text-violet-600 dark:text-violet-400 font-semibold mt-1"
            >
              {project.field}
            </motion.p>
          </div>
          <motion.button
            whileHover={{ scale: 1.15, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex-shrink-0 ml-4"
          >
            ✕
          </motion.button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 dark:text-slate-400 leading-relaxed"
          >
            {project.description}
          </motion.p>

          {/* Key highlights */}
          {project.sections ? (
            project.sections.map((section, si) => (
              <div key={si}>
                <motion.h4
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 + si * 0.1 }}
                  className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3"
                >
                  {section.heading}
                </motion.h4>
                {section.items.length === 1 ? (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + si * 0.1 }}
                    className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed"
                  >
                    {section.items[0]}
                  </motion.p>
                ) : (
                  <ul className="space-y-2">
                    {section.items.map((d, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + si * 0.1 + i * 0.05, type: 'spring', stiffness: 120 }}
                        className="flex items-start gap-3 text-sm text-slate-500 dark:text-slate-400"
                      >
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.35 + si * 0.1 + i * 0.05, type: 'spring', stiffness: 300 }}
                          className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-1.5 flex-shrink-0"
                        />
                        {d}
                      </motion.li>
                    ))}
                  </ul>
                )}
              </div>
            ))
          ) : project.details ? (
            <div>
              <motion.h4
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3"
              >
                Key Highlights
              </motion.h4>
              <ul className="space-y-2">
                {project.details.map((d, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.07, type: 'spring', stiffness: 120 }}
                    className="flex items-start gap-3 text-sm text-slate-500 dark:text-slate-400"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.35 + i * 0.07, type: 'spring', stiffness: 300 }}
                      className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-1.5 flex-shrink-0"
                    />
                    {d}
                  </motion.li>
                ))}
              </ul>
            </div>
          ) : null}

          {/* Skills used */}
          <div>
            <motion.h4
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3"
            >
              Skills Used
            </motion.h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.55 + i * 0.05, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400 border border-violet-200 dark:border-violet-500/10 cursor-default"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>

          {/* GitHub link */}
          {project.link && (
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 text-white text-sm font-semibold hover:shadow-lg hover:shadow-violet-500/20 transition-shadow"
            >
              View on GitHub →
            </motion.a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="projects" className="py-24 bg-white dark:bg-[#0f172a] relative overflow-hidden">
      <ProjectsBg />
      <FloatingElement className="absolute top-20 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl" duration={5} />

      <div className="max-w-6xl mx-auto px-6 relative">
        <SectionTitle>Featured Projects</SectionTitle>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <StaggerItem key={p.title}>
              <motion.div
                onClick={() => setSelected(p)}
                whileHover={{ y: -10, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                className="cursor-pointer group relative rounded-2xl overflow-hidden bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 hover:border-violet-500/30 shadow-sm dark:shadow-none hover:shadow-xl hover:shadow-violet-500/10 transition-colors duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400 border border-violet-200 dark:border-violet-500/10">
                      {p.field}
                    </span>
                    <motion.span
                      initial={{ rotate: 0 }}
                      whileHover={{ rotate: -45, scale: 1.2 }}
                      className="text-slate-400 dark:text-slate-500 group-hover:text-violet-500 transition-colors text-lg"
                    >
                      →
                    </motion.span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-2">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                    {p.tags.length > 3 && (
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-slate-500">
                        +{p.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
