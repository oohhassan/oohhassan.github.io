import { motion } from 'framer-motion';
import { SectionTitle, FadeUp, SlideIn, HoverCard, FloatingElement } from './Motion';
import { AboutBg } from './SectionBg';

export default function About() {
  const stats = [
    { value: '2+', label: 'Years Experience' },
    { value: '3+', label: 'Projects Delivered' },
  ];

  return (
    <section id="about" className="py-24 bg-white dark:bg-[#0f172a] relative overflow-hidden">
      <AboutBg />
      <FloatingElement className="absolute top-10 right-10 w-72 h-72 bg-violet-500/5 rounded-full blur-3xl" duration={5} />
      <FloatingElement className="absolute bottom-10 left-10 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl" duration={4} />

      <div className="max-w-4xl mx-auto px-6 relative">
        <SectionTitle>Why Work With Me</SectionTitle>

        <SlideIn direction="left">
          <div className="space-y-5">
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
              Your company needs someone who can take messy, scattered data and turn it into{' '}
              <span className="text-violet-600 dark:text-violet-400 font-semibold">decisions that move the needle</span>.
              That's exactly what I do. Using{' '}
              <span className="text-slate-800 dark:text-white font-medium">Python, SQL, Excel, Power BI, Tableau, and Plotly</span>,
              I build dashboards, automate reports, and create advanced interactive visualisations that uncover patterns your competitors miss.
            </p>
            <p className="text-slate-500 dark:text-slate-500 leading-relaxed">
              I don't just analyse data. I understand the business behind it. From tracking
              how NFP, CPI, and interest rate decisions move markets, to knowing exactly when
              volatility spikes before a Fed announcement, I bring the kind of{' '}
              <span className="text-slate-800 dark:text-white font-medium">economic awareness</span>{' '}
              that most analysts lack. Whether it's building an end-to-end analytics pipeline
              or designing a real-time dashboard that reacts to market news, I deliver work
              that's accurate, insightful, and ready to present to decision-makers.
            </p>
          </div>
        </SlideIn>

        <div className="grid grid-cols-2 gap-4 pt-8 max-w-md mx-auto">
          {stats.map((s, i) => (
            <FadeUp key={s.label} delay={i * 0.15 + 0.2}>
              <HoverCard className="text-center p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 cursor-default">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: i * 0.15 + 0.4, type: 'spring', stiffness: 200, damping: 10 }}
                  className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent"
                >
                  {s.value}
                </motion.div>
                <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">{s.label}</div>
              </HoverCard>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
