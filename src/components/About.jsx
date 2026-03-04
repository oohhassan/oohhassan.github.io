import { SectionTitle, FadeUp } from './Motion';

export default function About() {
  return (
    <section id="about" className="py-24 bg-[#0f0a1e] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <SectionTitle>About Me</SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12 items-center">
          <FadeUp>
            <div className="relative mx-auto">
              <div className="w-56 h-56 md:w-64 md:h-64 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-white/10 flex items-center justify-center text-gray-500 text-sm overflow-hidden">
                Your Photo
              </div>
              <div className="absolute -inset-3 rounded-2xl border border-indigo-500/20 -z-10" />
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="space-y-5">
              <p className="text-gray-400 leading-relaxed text-lg">
                I'm <span className="text-indigo-400 font-semibold">Hassan Ijaz</span>, a Data Analyst based in the
                UK with a strong foundation in <span className="text-white font-medium">financial markets</span> and
                <span className="text-white font-medium"> full-stack web development</span>. Currently pursuing my
                Master's in Data Analytics at the University of Huddersfield.
              </p>
              <p className="text-gray-500 leading-relaxed">
                I specialize in transforming complex datasets into clear, actionable insights using
                Python, SQL, Power BI, and Tableau. With hands-on experience in crypto, forex, futures,
                and options trading, I bring a unique blend of technical analysis and data storytelling
                to every project.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4">
                {[
                  { value: '2+', label: 'Years Dev Exp.' },
                  { value: '5+', label: 'Projects' },
                  { value: 'MSc', label: 'Data Analytics' },
                ].map((s) => (
                  <div key={s.label} className="text-center p-4 rounded-xl bg-white/[0.03] border border-white/5">
                    <div className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">{s.value}</div>
                    <div className="text-xs text-gray-500 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
