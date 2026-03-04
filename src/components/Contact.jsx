import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionTitle, FadeUp } from './Motion';

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

  return (
    <section id="contact" className="py-24 bg-[#0d0820] relative overflow-hidden">
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto px-6 relative">
        <SectionTitle>Get In Touch</SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <FadeUp>
            <div className="space-y-8">
              <p className="text-gray-400 leading-relaxed text-lg">
                Looking for a data analyst or developer? Let's connect and discuss how I can help turn your data into decisions.
              </p>

              <div className="space-y-5">
                {[
                  { label: 'Email', value: 'oohhassanijaz@gmail.com', href: 'mailto:oohhassanijaz@gmail.com', icon: '✉' },
                  { label: 'Location', value: 'United Kingdom', href: null, icon: '📍' },
                  { label: 'Phone', value: '+44 07884527418', href: 'tel:+4407884527418', icon: '📞' },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/10 flex items-center justify-center text-lg group-hover:bg-indigo-500/20 transition-colors">{c.icon}</div>
                    <div>
                      <p className="text-xs text-gray-600 uppercase tracking-wider">{c.label}</p>
                      {c.href ? (
                        <a href={c.href} className="text-white font-medium hover:text-indigo-400 transition-colors">{c.value}</a>
                      ) : (
                        <p className="text-white font-medium">{c.value}</p>
                      )}
                    </div>
                  </div>
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
                    whileHover={{ y: -3, scale: 1.1 }}
                    className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-gray-400 font-bold text-sm hover:text-white hover:border-indigo-500/30 hover:bg-indigo-500/10 transition-all duration-300"
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="hidden" name="subject" value="New Portfolio Contact Message" />
              <input type="hidden" name="from_name" value="Portfolio Website" />
              <input type="text" name="name" placeholder="Your Name" required className="w-full px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-indigo-500/5 transition-all duration-300" />
              <input type="email" name="email" placeholder="Your Email" required className="w-full px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-indigo-500/5 transition-all duration-300" />
              <textarea rows={5} name="message" placeholder="Your Message" required className="w-full px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-600 text-sm resize-y focus:outline-none focus:border-indigo-500/50 focus:bg-indigo-500/5 transition-all duration-300" />
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <motion.button type="submit" disabled={sending} whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold hover:shadow-2xl hover:shadow-indigo-500/20 transition-shadow duration-300 cursor-pointer disabled:opacity-60">
                {sending ? 'Sending...' : submitted ? '✓ Message Sent!' : 'Send Message →'}
              </motion.button>
            </form>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
