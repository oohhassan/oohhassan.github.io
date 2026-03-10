import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionTitle, SlideIn, FloatingElement } from './Motion';
import { ContactBg } from './SectionBg';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError('');

    const formData = new FormData(e.target);
    formData.append('access_key', 'bd814da4-621c-4955-8035-4c016cec573f');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        e.target.reset();
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const contactInfo = [
    { label: 'Email', value: 'oohhassanijaz@gmail.com', href: 'mailto:oohhassanijaz@gmail.com', icon: '✉' },
    { label: 'Location', value: 'United Kingdom', href: null, icon: '📍' },
    { label: 'Phone', value: '+44 07884527418', href: 'tel:+4407884527418', icon: '📞' },
  ];

  return (
    <section id="contact" className="py-24 bg-white dark:bg-[#0f172a] relative overflow-hidden">
      <ContactBg />
      <FloatingElement className="absolute top-0 right-1/3 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" duration={5} />

      <div className="max-w-5xl mx-auto px-6 relative">
        <SectionTitle>Get In Touch</SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <SlideIn direction="left">
            <div className="space-y-8">
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                Looking for a data analyst? Let's connect and discuss how I can help turn your data
                into decisions.
              </p>

              <div className="space-y-5">
                {contactInfo.map((c, i) => (
                  <motion.div
                    key={c.label}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: i * 0.15, type: 'spring', stiffness: 100 }}
                    className="flex items-center gap-4 group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 8 }}
                      className="w-12 h-12 rounded-xl bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/10 flex items-center justify-center text-lg group-hover:bg-violet-100 dark:group-hover:bg-violet-500/20 transition-colors"
                    >
                      {c.icon}
                    </motion.div>
                    <div>
                      <p className="text-xs text-slate-400 dark:text-slate-600 uppercase tracking-wider">
                        {c.label}
                      </p>
                      {c.href ? (
                        <a href={c.href} className="text-slate-800 dark:text-white font-medium hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                          {c.value}
                        </a>
                      ) : (
                        <p className="text-slate-800 dark:text-white font-medium">{c.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                {[
                  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/oohhassan/', icon: 'in' },
                  { label: 'GitHub', href: 'https://github.com/oohhassan', icon: 'GH' },
                ].map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.label}
                    whileHover={{ y: -4, scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 font-bold text-sm hover:text-violet-600 dark:hover:text-white hover:border-violet-500/30 hover:bg-violet-50 dark:hover:bg-violet-500/10 transition-all duration-300 shadow-sm dark:shadow-none"
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </SlideIn>

          <SlideIn direction="right" delay={0.15}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="hidden" name="subject" value="New Portfolio Contact Message" />
              <input type="hidden" name="from_name" value="Portfolio Website" />
              {['name', 'email'].map((field) => (
                <motion.input
                  key={field}
                  whileFocus={{ scale: 1.01, borderColor: 'rgba(124, 58, 237, 0.5)' }}
                  type={field === 'email' ? 'email' : 'text'}
                  name={field}
                  placeholder={field === 'name' ? 'Your Name' : 'Your Email'}
                  required
                  className="w-full px-5 py-3.5 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500/50 focus:bg-violet-50/50 dark:focus:bg-violet-500/5 transition-all duration-300 shadow-sm dark:shadow-none"
                />
              ))}
              <motion.textarea
                whileFocus={{ scale: 1.01, borderColor: 'rgba(124, 58, 237, 0.5)' }}
                rows={5}
                name="message"
                placeholder="Your Message"
                required
                className="w-full px-5 py-3.5 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 text-sm resize-y focus:outline-none focus:border-violet-500/50 focus:bg-violet-50/50 dark:focus:bg-violet-500/5 transition-all duration-300 shadow-sm dark:shadow-none"
              />
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-500 text-sm"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
              <motion.button
                type="submit"
                disabled={sending}
                whileHover={{ scale: 1.03, y: -2, boxShadow: '0 16px 40px rgba(124, 58, 237, 0.2)' }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 text-white font-semibold transition-shadow duration-300 cursor-pointer disabled:opacity-60 relative overflow-hidden"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-500"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4 }}
                />
                <span className="relative z-10">
                  {sending ? 'Sending...' : submitted ? '✓ Message Sent!' : 'Send Message →'}
                </span>
              </motion.button>
            </form>
          </SlideIn>
        </div>
      </div>
    </section>
  );
}
