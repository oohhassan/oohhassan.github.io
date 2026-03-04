import { SectionTitle, StaggerContainer, StaggerItem } from './Motion';

const skills = [
  { icon: '🐍', name: 'Python', level: 88 },
  { icon: '🗄️', name: 'SQL', level: 90 },
  { icon: '📊', name: 'Power BI', level: 85 },
  { icon: '📈', name: 'Tableau', level: 82 },
  { icon: '📗', name: 'Excel', level: 92 },
  { icon: '⚛️', name: 'React', level: 85 },
  { icon: '🔷', name: 'PHP/Laravel', level: 80 },
  { icon: '📉', name: 'Statistical Analysis', level: 85 },
  { icon: '💹', name: 'Technical Analysis', level: 88 },
  { icon: '🏦', name: 'Fundamentals', level: 86 },
  { icon: '🔧', name: 'Git/GitHub', level: 82 },
  { icon: '📐', name: 'Data Visualization', level: 87 },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-[#0d0820] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <SectionTitle>Skills & Expertise</SectionTitle>

        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {skills.map((s) => (
            <StaggerItem key={s.name}>
              <div className="group relative p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all duration-500 text-center cursor-default overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <span className="text-3xl block mb-3">{s.icon}</span>
                  <span className="font-semibold text-sm text-gray-300 group-hover:text-white transition-colors">{s.name}</span>
                  <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" style={{ width: `${s.level}%` }} />
                  </div>
                  <span className="text-[10px] text-gray-600 mt-1 block group-hover:text-gray-400 transition-colors">{s.level}%</span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
