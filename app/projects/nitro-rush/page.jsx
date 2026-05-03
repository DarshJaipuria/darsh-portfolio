'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState, useEffect } from "react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

const FEATURES = [
  { icon: '🤖', title: 'AI Opponent Racing', desc: 'Intelligent opponents follow dynamic track paths with speed variation.' },
  { icon: '🌀', title: 'Drift Physics', desc: 'Realistic drift mechanics using velocity and angular momentum.' },
  { icon: '⚡', title: 'Nitro Boost', desc: 'Collectible nitro system with visual burst and speed multiplier.' },
  { icon: '✨', title: 'Particle Effects', desc: 'Custom smoke trails, boost sparks, and exhaust particles.' },
  { icon: '⏱️', title: 'Lap Timing', desc: 'Real-time lap tracking, position updates, and race standings.' },
  { icon: '🎮', title: 'Race Setup UI', desc: 'Pre-race configuration screen with difficulty and track selection.' },
];

const TECH = [
  { label: 'Three.js', color: '#a855f7' },
  { label: 'JavaScript', color: '#f59e0b' },
  { label: 'WebGL', color: '#3b82f6' },
  { label: 'Custom Physics', color: '#ec4899' },
];

const HOW = [
  { label: 'Physics', text: 'Car movement uses velocity, friction, and drift angle for realistic handling.' },
  { label: 'AI', text: 'Opponent follows track path waypoints with dynamic speed variation.' },
  { label: 'Rendering', text: 'Built with Three.js optimized scene — minimal draw calls, efficient buffers.' },
  { label: 'Particles', text: 'Custom particle system handles smoke trails and nitro boost bursts.' },
];

export default function NitroRushPage() {
  const router = useRouter();
  const [showGame, setShowGame] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileWarning, setShowMobileWarning] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div style={{ background: '#050505', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'Rajdhani, sans-serif', overflowX: 'hidden' }}>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
        {/* Background gradients */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(236,72,153,0.12), transparent 70%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(168,85,247,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.04 }} />

        {/* Scan beam */}
        <motion.div
          className="absolute left-0 right-0 h-px opacity-20 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, #ec4899, transparent)' }}
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />

        <motion.div {...fadeUp(0)} className="relative z-10 max-w-4xl w-full">
          <span className="text-xs font-mono tracking-[0.5em] text-pink-400/50 block mb-6">3D / GAME ENGINE</span>

          <h1
            className="font-black mb-3 leading-none"
            style={{
              fontFamily: 'Orbitron, monospace',
              fontSize: 'clamp(3rem, 10vw, 7rem)',
              background: 'linear-gradient(135deg, #ec4899, #a855f7, #f59e0b)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}
          >
            NITRO RUSH
          </h1>
          <p className="text-xl font-mono mb-10" style={{ color: 'rgba(236,72,153,0.7)', letterSpacing: '0.3em' }}>
            3D RACING EXPERIENCE
          </p>

          {/* GIF */}
          <motion.div
            {...fadeUp(0.15)}
            className="relative mx-auto mb-10 rounded-2xl overflow-hidden"
            style={{
              maxWidth: '720px',
              border: '1px solid rgba(236,72,153,0.3)',
              boxShadow: '0 0 60px rgba(236,72,153,0.15), 0 0 120px rgba(168,85,247,0.08)',
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, transparent, #ec4899, #f59e0b, transparent)' }} />
            <img
              src="/nitro-demo.gif"
              alt="Nitro Rush gameplay"
              className="w-full block"
              style={{ maxHeight: '400px', objectFit: 'cover' }}
            />
          </motion.div>

          {/* CTA buttons */}
          <motion.div {...fadeUp(0.25)} className="flex flex-wrap items-center justify-center gap-4">

            <button
              onClick={() => {
                if (isMobile) {
                  setShowMobileWarning(true);
                } else {
                  setShowGame(true);
                }
              }}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-black text-sm tracking-widest text-white transition-all hover:-translate-y-0.5"
              style={{
                fontFamily: 'Orbitron, monospace',
                background: 'linear-gradient(135deg, #22c55e, #06b6d4)',
                boxShadow: '0 0 24px rgba(34,197,94,0.4)',
                cursor: 'none',
              }}
            > 
              ▶ PLAY DEMO
            </button>

            <a
              href="https://github.com/DarshJaipuria/nitro-rush-3d"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-black text-sm tracking-widest text-white transition-all hover:-translate-y-0.5"
              style={{
                fontFamily: 'Orbitron, monospace',
                background: 'linear-gradient(135deg, #ec4899, #a855f7)',
                boxShadow: '0 0 24px rgba(236,72,153,0.4)',
                cursor: 'none',
              }}
              
            >
              <GithubIcon /> VIEW GITHUB
            </a>
            <button
              onClick={() => router.push('/')}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-black text-sm tracking-widest transition-all hover:-translate-y-0.5"
              style={{
                fontFamily: 'Orbitron, monospace',
                background: 'transparent',
                border: '1px solid rgba(168,85,247,0.5)',
                color: '#a855f7',
                cursor: 'none',
              }}
            >
              ← BACK TO HOME
            </button>
          </motion.div>
        </motion.div>
      </section>

      {showMobileWarning && (
        <section className="px-6 pb-20">
          <div className="max-w-md mx-auto text-center p-6 rounded-2xl bg-black/60 border border-purple-500/30">

            <h2 className="text-xl font-bold text-white mb-2">
              ⚠ Desktop Only
            </h2>

            <p className="text-gray-300 text-sm mb-4">
              Nitro Rush demo is optimized for desktop and not playable on mobile.
            </p>

            <button
              onClick={() => setShowMobileWarning(false)}
              className="px-5 py-2 rounded bg-purple-500 text-white"
            >
              OK
            </button>

          </div>
        </section>
      )}

      {showGame && (
        <section className="px-6 pb-20">
          <div className="max-w-6xl mx-auto relative">

            <button
              onClick={() => setShowGame(false)}
              className="absolute top-2 right-2 z-10 px-4 py-1 rounded bg-black/70 text-white text-sm"
            >
              ✕ CLOSE
            </button>

            <iframe
                src="/games/nitro-rush/index.html"
                sandbox="allow-scripts allow-same-origin allow-popups"
                allow="autoplay"
                className="w-full h-[80vh] max-h-[700px] rounded-2xl border-none"
                style={{ cursor: "default" }}
                onMouseEnter={() => {
                  document.body.classList.add("no-custom-cursor");
                  document.body.style.cursor = "auto";
                }}
                onMouseLeave={() => {
                  document.body.classList.remove("no-custom-cursor");
                  document.body.style.cursor = "none";
                }}
            />
          </div>
        </section>
      )}

      {/* OVERVIEW */}
      <Section>
        <motion.div {...fadeUp()} className="max-w-3xl mx-auto text-center">
          <Tag>OVERVIEW</Tag>
          <p className="text-xl leading-relaxed mt-6" style={{ color: 'rgba(226,232,240,0.65)', fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}>
            A browser-based 3D racing game built with <Accent>Three.js</Accent> featuring{' '}
            <Accent>AI opponents</Accent>, drift mechanics, and nitro boost. Built entirely from scratch with custom
            physics and a hand-crafted rendering pipeline.
          </p>
        </motion.div>
      </Section>

      {/* FEATURES */}
      <Section dark>
        <motion.div {...fadeUp()} className="text-center mb-12">
          <Tag>FEATURES</Tag>
          <h2 className="text-4xl font-black mt-4" style={{ fontFamily: 'Orbitron, monospace', color: '#fff' }}>WHAT IT DOES</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {FEATURES.map((f, i) => (
            <motion.div key={f.title} {...fadeUp(i * 0.07)} className="rounded-xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(236,72,153,0.12)' }}>
              <span className="text-3xl block mb-3">{f.icon}</span>
              <h3 className="font-black text-white mb-2" style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.85rem', letterSpacing: '0.1em' }}>{f.title}</h3>
              <p className="text-sm" style={{ color: 'rgba(226,232,240,0.5)' }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* TECH STACK */}
      <Section>
        <motion.div {...fadeUp()} className="text-center mb-10">
          <Tag>TECH STACK</Tag>
        </motion.div>
        <motion.div {...fadeUp(0.1)} className="flex flex-wrap justify-center gap-4">
          {TECH.map(t => (
            <span
              key={t.label}
              className="px-6 py-3 rounded-full font-black text-sm tracking-widest"
              style={{
                fontFamily: 'Orbitron, monospace',
                background: `${t.color}14`,
                border: `1px solid ${t.color}35`,
                color: t.color,
                boxShadow: `0 0 16px ${t.color}20`,
              }}
            >
              {t.label}
            </span>
          ))}
        </motion.div>
      </Section>

      {/* SCREENSHOTS */}
      <Section dark>
        <motion.div {...fadeUp()} className="text-center mb-12">
          <Tag>SCREENSHOTS</Tag>
          <h2 className="text-4xl font-black mt-4" style={{ fontFamily: 'Orbitron, monospace', color: '#fff' }}>IN ACTION</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {['/nitro-1.png', '/nitro-2.png', '/nitro-3.png'].map((src, i) => (
            <motion.div
              key={src}
              {...fadeUp(i * 0.1)}
              className="rounded-xl overflow-hidden"
              style={{ border: '1px solid rgba(236,72,153,0.2)', boxShadow: '0 0 30px rgba(236,72,153,0.06)' }}
            >
              <img src={src} alt={`Nitro Rush screenshot ${i + 1}`} className="w-full block object-cover" style={{ aspectRatio: '16/10' }} />
            </motion.div>
          ))}
        </div>
      </Section>

      {/* HOW IT WORKS */}
      <Section>
        <motion.div {...fadeUp()} className="text-center mb-12">
          <Tag>UNDER THE HOOD</Tag>
          <h2 className="text-4xl font-black mt-4" style={{ fontFamily: 'Orbitron, monospace', color: '#fff' }}>HOW IT WORKS</h2>
        </motion.div>
        <div className="max-w-3xl mx-auto space-y-4">
          {HOW.map((h, i) => (
            <motion.div
              key={h.label}
              {...fadeUp(i * 0.08)}
              className="flex gap-5 rounded-xl p-5"
              style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(168,85,247,0.12)' }}
            >
              <span
                className="flex-shrink-0 text-xs font-black tracking-widest px-3 py-1 rounded-full h-fit mt-0.5"
                style={{ fontFamily: 'Orbitron, monospace', background: 'rgba(168,85,247,0.12)', color: '#a855f7', border: '1px solid rgba(168,85,247,0.2)' }}
              >
                {h.label}
              </span>
              <p style={{ color: 'rgba(226,232,240,0.6)' }}>{h.text}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section dark>
        <motion.div {...fadeUp()} className="text-center max-w-xl mx-auto">
          <h2 className="text-4xl font-black mb-4" style={{ fontFamily: 'Orbitron, monospace', background: 'linear-gradient(135deg, #ec4899, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            RACE THE CODE
          </h2>
          <p className="mb-10 text-lg" style={{ color: 'rgba(226,232,240,0.5)' }}>
            Explore the full source — every physics tick, every particle, every lap.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/DarshJaipuria/nitro-rush-3d"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-black text-sm tracking-widest text-white transition-all hover:-translate-y-0.5"
              style={{ fontFamily: 'Orbitron, monospace', background: 'linear-gradient(135deg, #ec4899, #a855f7)', boxShadow: '0 0 24px rgba(236,72,153,0.35)', cursor: 'none' }}
            >
              <GithubIcon /> VIEW GITHUB
            </a>
            <button
              onClick={() => router.push('/')}
              className="px-8 py-3 rounded-lg font-black text-sm tracking-widest transition-all hover:-translate-y-0.5"
              style={{ fontFamily: 'Orbitron, monospace', border: '1px solid rgba(168,85,247,0.45)', color: '#a855f7', cursor: 'none' }}
            >
              ← BACK TO HOME
            </button>
          </div>
        </motion.div>
      </Section>

    </div>
  );
}

// ── helpers ──────────────────────────────────────────────────────────────────

function Section({ children, dark }) {
  return (
    <section
      className="py-24 px-6"
      style={{ background: dark ? '#080810' : '#050505' }}
    >
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
}

function Tag({ children }) {
  return (
    <span className="text-xs font-mono tracking-[0.5em] text-pink-400/50">{children}</span>
  );
}

function Accent({ children }) {
  return <span style={{ color: '#ec4899' }}>{children}</span>;
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}
