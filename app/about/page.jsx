'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const INFO = [
  { label: 'Age',       value: '17' },
  { label: 'Class',     value: 'XII — CBSE' },
  { label: 'City',      value: 'Kolkata, India' },
  { label: 'Focus',     value: 'AI + Web Dev' },
  { label: 'Currently', value: 'Building & Learning' },
  { label: 'Goal',      value: 'Top CS Program + Startup' },
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
});

export default function AboutPage() {
  const router = useRouter();

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #050505 0%, #08040f 50%, #050505 100%)',
        overflowX: 'hidden',
        overflowY: 'auto',
        touchAction: 'pan-y',
      }}
    >
      {/* Grid bg */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(168,85,247,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.12) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        }}
      />
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(168,85,247,0.08), transparent 70%)',
        }}
      />

      {/* Back button */}
      <motion.button
        {...fade(0.1)}
        onClick={() => router.back()}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 font-mono text-xs tracking-widest text-purple-400 transition-all"
        style={{
          background: 'rgba(168,85,247,0.08)',
          border: '1px solid rgba(168,85,247,0.25)',
          borderRadius: 2,
          backdropFilter: 'blur(12px)',
          cursor: 'pointer',
        }}
        whileHover={{ x: -3, borderColor: 'rgba(168,85,247,0.7)', color: '#fff' }}
      >
        ← BACK
      </motion.button>

      {/* Page content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center lg:items-start gap-12">

        {/* ── LEFT: Profile ── */}
        <motion.div {...fade(0.2)} className="flex flex-col items-center gap-5 lg:sticky lg:top-24 flex-shrink-0">
          {/* Avatar */}
          <div className="relative">
            <div
              className="w-44 h-44 rounded-full overflow-hidden"
              style={{
                border: '2px solid rgba(168,85,247,0.5)',
                boxShadow: '0 0 40px rgba(168,85,247,0.3), 0 0 80px rgba(168,85,247,0.1)',
              }}
            >
              <img
                src="/profile.jpg"
                alt="Darsh Jaipuria"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement.style.background =
                    'linear-gradient(135deg, rgba(168,85,247,0.3), rgba(59,130,246,0.3))';
                  e.currentTarget.parentElement.innerHTML =
                    '<span style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;font-size:4rem;">👤</span>';
                }}
              />
            </div>
            {/* Orbit ring */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                border: '1px dashed rgba(168,85,247,0.2)',
                transform: 'scale(1.15)',
                animation: 'spin 12s linear infinite',
              }}
            />
            <style>{`@keyframes spin { to { transform: scale(1.15) rotate(360deg); } }`}</style>
          </div>

          {/* Name */}
          <div className="text-center">
            <h1
              className="text-2xl font-black tracking-wider mb-1"
              style={{
                fontFamily: 'Orbitron, monospace',
                background: 'linear-gradient(135deg, #fff, rgba(168,85,247,0.9))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              DARSH JAIPURIA
            </h1>
            <p
              className="text-sm font-mono tracking-widest"
              style={{ color: 'rgba(168,85,247,0.7)' }}
            >
              AI &amp; Data Science Enthusiast
            </p>
          </div>

          {/* Status pill */}
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs tracking-widest"
            style={{
              background: 'rgba(74,222,128,0.06)',
              border: '1px solid rgba(74,222,128,0.2)',
            }}
          >
            <span
              className="w-2 h-2 rounded-full bg-green-400"
              style={{ boxShadow: '0 0 6px rgba(74,222,128,0.8)', animation: 'pulse 2s infinite' }}
            />
            <span className="text-green-400/80">OPEN TO OPPORTUNITIES</span>
          </div>

          {/* CV Button */}
          <motion.a
            href="/Darsh_Jaipuria_CV.pdf"
            download
            className="flex items-center gap-2 px-6 py-3 font-mono text-sm tracking-widest text-white font-bold"
            style={{
              background: 'linear-gradient(135deg, #a855f7, #3b82f6)',
              borderRadius: 2,
              cursor: 'pointer',
              textDecoration: 'none',
              boxShadow: '0 0 20px rgba(168,85,247,0.3)',
            }}
            whileHover={{
              boxShadow: '0 0 40px rgba(168,85,247,0.7), 0 0 80px rgba(59,130,246,0.3)',
              scale: 1.04,
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            ↓ DOWNLOAD CV
          </motion.a>

          <motion.a
            href="/certificates"
            className="mt-4 inline-flex items-center gap-2 px-6 py-2 rounded-lg font-black text-sm tracking-widest text-white transition-all hover:-translate-y-0.5"
            style={{
              fontFamily: 'Orbitron, monospace',
              background: 'linear-gradient(135deg, #06b6d4, #a855f7)',
              boxShadow: '0 0 20px rgba(6,182,212,0.35)',
              cursor: 'none',
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            📜 VIEW CERTIFICATES
          </motion.a>
        </motion.div>

        {/* ── RIGHT: Content ── */}
        <div className="flex-1 flex flex-col gap-8 w-full">

          {/* About Me */}
          <motion.div {...fade(0.3)}>
            <SectionCard label="01 // ABOUT ME" color="#a855f7">
              <p
                className="text-base leading-relaxed"
                style={{ fontFamily: 'Rajdhani, sans-serif', color: 'rgba(226,232,240,0.75)', fontSize: '1.05rem' }}
              >
                I'm a 17-year-old builder from Kolkata who gets unreasonably excited about making
                things work. Whether it's training a model that recognises faces or wiring together a
                3D web experience, I care about one thing: does it feel{' '}
                <span style={{ color: '#a855f7' }}>alive</span>? I'm currently in Class XII and
                spending every spare hour at the intersection of{' '}
                <span style={{ color: '#3b82f6' }}>AI, data science</span>, and interactive web
                development. I don't just want to consume technology — I want to{' '}
                <span style={{ color: '#ec4899' }}>shape it</span>.
              </p>
            </SectionCard>
          </motion.div>

          {/* Basic Info */}
          <motion.div {...fade(0.4)}>
            <SectionCard label="02 // QUICK FACTS" color="#3b82f6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {INFO.map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 px-4 py-3 rounded"
                    style={{
                      background: 'rgba(255,255,255,0.025)',
                      border: '1px solid rgba(168,85,247,0.1)',
                    }}
                  >
                    <span
                      className="text-xs font-mono tracking-widest w-24 flex-shrink-0"
                      style={{ color: 'rgba(168,85,247,0.5)' }}
                    >
                      {label.toUpperCase()}
                    </span>
                    <span
                      className="text-sm font-semibold"
                      style={{ fontFamily: 'Rajdhani, sans-serif', color: 'rgba(226,232,240,0.9)' }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </SectionCard>
          </motion.div>

          {/* Future Goals */}
          <motion.div {...fade(0.5)}>
            <SectionCard label="03 // TRAJECTORY" color="#ec4899">
              <ul className="flex flex-col gap-3">
                {[
                  { icon: '🎓', text: 'Secure a seat at a top CS program (India or abroad)' },
                  { icon: '🤖', text: 'Go deep on ML research — interpretability, agents, real-world systems' },
                  { icon: '🚀', text: 'Build a product that solves a real problem at scale' },
                  { icon: '🌐', text: 'Keep making the web a more interesting place to exist in' },
                ].map(({ icon, text }) => (
                  <li
                    key={text}
                    className="flex items-start gap-3 text-sm"
                    style={{ fontFamily: 'Rajdhani, sans-serif', color: 'rgba(226,232,240,0.7)', fontSize: '1rem' }}
                  >
                    <span className="text-lg leading-none mt-0.5">{icon}</span>
                    {text}
                  </li>
                ))}
              </ul>
            </SectionCard>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

function SectionCard({ label, color, children }) {
  return (
    <div
      className="rounded-xl p-6"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${color}25`,
        backdropFilter: 'blur(20px)',
        boxShadow: `0 0 30px ${color}08`,
      }}
    >
      <p
        className="text-xs font-mono tracking-[0.4em] mb-4"
        style={{ color: `${color}90` }}
      >
        {label}
      </p>
      {children}
    </div>
  );
}