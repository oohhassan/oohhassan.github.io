import { SectionTitle, FadeUp } from './Motion';

const items = [
  {
    role: 'Full-Stack Web Developer',
    org: 'Akvon IT Solutions',
    date: 'Jul 2023 – Apr 2025',
    desc: 'Developed and maintained web applications using React for front-end and PHP/Laravel for back-end with MySQL databases. Built RESTful APIs, implemented authentication systems, and optimized database queries for improved performance across client projects.',
    tags: ['React', 'PHP', 'Laravel', 'MySQL'],
  },
  {
    role: 'Financial Market Analyst',
    org: 'Self-Employed / Freelance',
    date: '2021 – Present',
    desc: 'Analysing crypto, forex, futures, and options markets using fundamental and technical analysis. Applying micro and macroeconomic indicators to develop data-driven trading strategies and market insights.',
    tags: ['Forex', 'Crypto', 'Technical Analysis', 'Fundamentals'],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-[#0d0820] relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-indigo-600/5 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-6 relative">
        <SectionTitle>Experience</SectionTitle>

        <div className="relative">
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 via-violet-500/30 to-transparent" />

          <div className="space-y-12">
            {items.map((item, i) => (
              <FadeUp key={i} delay={i * 0.15}>
                <div className="relative pl-8 md:pl-20">
                  <div className="absolute left-[-5px] md:left-[27px] top-1 w-3 h-3 rounded-full bg-indigo-500 ring-4 ring-[#0d0820] shadow-lg shadow-indigo-500/30" />
                  <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-indigo-500/20 transition-all duration-500 group">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">{item.role}</h3>
                      <span className="text-xs text-gray-500 font-mono mt-1 sm:mt-0">{item.date}</span>
                    </div>
                    <p className="text-indigo-400 font-semibold text-sm mb-3">{item.org}</p>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4">{item.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span key={tag} className="text-[11px] font-semibold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/10">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
