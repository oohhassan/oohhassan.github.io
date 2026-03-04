import { SectionTitle, FadeUp } from './Motion';

const items = [
  {
    degree: 'MSc Data Analytics',
    org: 'University of Huddersfield, UK',
    date: '2025 – Present',
    desc: 'Focusing on machine learning, statistical analysis, and data-driven decision making. Dissertation: Predicting CO₂ Savings of Energy Efficiency in UK Housing.',
    badge: 'In Progress',
  },
  {
    degree: 'BS Computer Science',
    org: 'University of Management & Technology, Pakistan',
    date: '2019 – 2023',
    desc: 'Core coursework in Data Structures, Algorithms, Database Systems, and Software Engineering. Final Year Project: Online Bidding System.',
    badge: 'Completed',
  },
];

export default function Education() {
  return (
    <section id="education" className="py-24 bg-[#0f0a1e] relative overflow-hidden">
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-violet-600/5 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-6 relative">
        <SectionTitle>Education</SectionTitle>

        <div className="relative">
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/50 via-indigo-500/30 to-transparent" />

          <div className="space-y-12">
            {items.map((item, i) => (
              <FadeUp key={i} delay={i * 0.15}>
                <div className="relative pl-8 md:pl-20">
                  <div className="absolute left-[-5px] md:left-[27px] top-1 w-3 h-3 rounded-full bg-violet-500 ring-4 ring-[#0f0a1e] shadow-lg shadow-violet-500/30" />
                  <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-violet-500/20 transition-all duration-500 group">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-violet-300 transition-colors">{item.degree}</h3>
                      <span className="text-xs text-gray-500 font-mono mt-1 sm:mt-0">{item.date}</span>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <p className="text-violet-400 font-semibold text-sm">{item.org}</p>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/10">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
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
