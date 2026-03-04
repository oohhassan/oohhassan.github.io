import { motion } from 'framer-motion';
import { SectionTitle, StaggerContainer, StaggerItem } from './Motion';

const projects = [
  {
    title: 'CO₂ Savings Prediction Model',
    description:
      'MSc dissertation project — built a machine learning pipeline to predict CO₂ savings from energy-efficiency measures in UK housing using Python, Pandas, and Scikit-learn with real government datasets.',
    tags: ['Python', 'Scikit-learn', 'Pandas', 'Data Analytics'],
    color: 'from-green-600 to-emerald-600',
    link: 'https://github.com/oohhassan',
  },
  {
    title: 'Online Bidding System',
    description:
      'BSc final-year project — a full-stack real-time auction platform with user authentication, live bidding, payment integration, and an admin dashboard built with PHP, Laravel, and MySQL.',
    tags: ['PHP', 'Laravel', 'MySQL', 'React'],
    color: 'from-indigo-600 to-blue-600',
    link: 'https://github.com/oohhassan',
  },
  {
    title: 'Portfolio Website',
    description:
      'This interactive 3D portfolio built with React, Three.js, and Tailwind CSS featuring dynamic animations, responsive design, and modern UI/UX principles.',
    tags: ['React', 'Three.js', 'Tailwind CSS', 'Framer Motion'],
    color: 'from-violet-600 to-purple-600',
    link: 'https://github.com/oohhassan',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-[#0f0a1e] relative overflow-hidden">
      <div className="absolute top-20 right-0 w-80 h-80 bg-violet-600/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <SectionTitle>Featured Projects</SectionTitle>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <StaggerItem key={p.title}>
              <motion.a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="block group relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/5 hover:border-indigo-500/20 transition-colors duration-500"
              >
                <div className={`h-44 bg-gradient-to-br ${p.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-[-45deg]">
                    <span className="text-white text-lg">→</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">{p.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{p.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <span key={tag} className="text-[11px] font-semibold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/10">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.a>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
