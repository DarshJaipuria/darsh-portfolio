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
  { icon: '👾', title: 'Multi-Phase Boss', desc: 'State machine logic driving endless enemy waves transitioning into a heavy boss encounter.' },
  { icon: '🌌', title: 'Infinite Parallax', desc: 'Mathematical coordinate reset system for endless background scrolling without visual drift.' },
  { icon: '💥', title: 'Vector Particles', desc: 'Dynamic explosion physics with localized 360-degree radial velocity and transparency decay.' },
  { icon: '📳', title: 'Cinematic Screen Shake', desc: 'Global offset algorithm creating violent camera impacts while maintaining rendering logic.' },
  { icon: '📡', title: 'Broadcast UI', desc: 'System-level event triggers for seamless transitions between Boot, Gameplay, Win, and Lose states.' },
  { icon: '🔊', title: 'Synchronized Audio', desc: 'Integrated custom sound engine for laser fire, damage impacts, and particle explosions.' },
];

const TECH = [
  { label: 'Scratch', color: '#a855f7' },
  { label: 'Custom Physics', color: '#f59e0b' },
  { label: 'State Machines', color: '#3b82f6' },
  { label: 'Scratch', color: '#ec4899' },
];

const HOW = [
  { label: 'Architecture', text: 'Custom 2D engine built from scratch utilizing strict execution order to prevent race conditions.' },
  { label: 'Memory', text: 'Utilizes local variable instantiation to grant independent memory slots to cloned particle fragments.' },
  { label: 'State Control', text: 'Robust global broadcast system separating UI logic from active gameplay loops.' },
  { label: 'Rendering', text: 'Relative coordinate mathematics allow for complex visual effects without destroying core movement tracks.' },
];

export default function NeonVoidPage() {
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
          <span className="text-xs font-mono tracking-[0.5em] text-pink-400/50 block mb-6">2D / ARCADE ENGINE</span>

          <h1
            className="font-black mb-3 leading-none"
            style={{
              fontFamily: 'Orbitron, monospace',
              fontSize: 'clamp(3rem, 10vw, 7rem)',
              background: 'linear-gradient(135deg, #ec4899, #a855f7, #f59e0b)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}
          >
            NEON VOID
          </h1>
          <p className="text-xl font-mono mb-10" style={{ color: 'rgba(236,72,153,0.7)', letterSpacing: '0.3em' }}>
            2D ARCADE SPACE SHOOTER
          </p>

          {/* THE GIF PLACEHOLDER */}
          <motion.div
            {...fadeUp(0.15)}
            className="relative mx-auto mb-10 rounded-2xl overflow-hidden bg-black"
            style={{
              maxWidth: '720px',
              border: '1px solid rgba(236,72,153,0.3)',
              boxShadow: '0 0 60px rgba(236,72,153,0.15), 0 0 120px rgba(168,85,247,0.08)',
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 z-10" style={{ background: 'linear-gradient(90deg, transparent, #ec4899, #f59e0b, transparent)' }} />
            <img
              src="/games/neon-void/neon-void-preview.gif"
              alt="Neon Void gameplay"
              className="w-full block"
              style={{ maxHeight: '400px', objectFit: 'cover' }}
            />
          </motion.div>

{/* CTA buttons */}
          <motion.div {...fadeUp(0.25)} className="flex flex-wrap items-center justify-center gap-4">
            
            {/* ADD THIS PLAY DEMO BUTTON BACK IN */}
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

            {/* YOUR EXISTING GITHUB BUTTON */}
            <a
              href="https://github.com/DarshJaipuria/neon-void"
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
            
            {/* YOUR EXISTING BACK BUTTON */}
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
        {/* MOBILE WARNING POPUP */}
        {showMobileWarning && (
          <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-6">
            <div className="max-w-md w-full mx-auto text-center p-8 rounded-2xl bg-[#0a0a0a] border border-purple-500/30">
              <h2 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Orbitron, monospace' }}>
                ⚠ Desktop Only
              </h2>
              <p className="text-gray-400 text-sm mb-6">
                The Neon Void demo is optimized for keyboard controls and is not playable on mobile.
              </p>
              <button
                onClick={() => setShowMobileWarning(false)}
                className="px-8 py-2 rounded-lg font-bold text-white tracking-widest"
                style={{ background: 'linear-gradient(135deg, #ec4899, #a855f7)' }}
              >
                OK
              </button>
            </div>
          </section>
        )}

        {/* GAME OVERLAY MODAL */}
        {showGame && (
          <section className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md px-6">
            <div className="w-full max-w-2xl relative flex flex-col items-center">
              
              {/* Close Button above the game */}
              <div className="w-full max-w-[485px] flex justify-end mb-4">
                <button
                  onClick={() => setShowGame(false)}
                  className="px-4 py-2 rounded font-black text-xs tracking-widest text-white transition-all hover:text-pink-400 border border-white/20 hover:border-pink-400/50"
                  style={{ fontFamily: 'Orbitron, monospace', cursor: 'none' }}
                >
                  ✕ CLOSE GAME
                </button>
              </div>

              {/* The Scratch Iframe (TRIAL VERSION) */}
              <div className="w-full max-w-[485px] flex justify-center bg-[#000] rounded-xl overflow-hidden shadow-[0_0_60px_rgba(168,85,247,0.25)] border border-purple-500/30">
                <iframe
                  src="https://scratch.mit.edu/projects/1326998112/embed" 
                  allowTransparency={true}
                  allowFullScreen={true}
                  scrolling="no"
                  sandbox="allow-scripts allow-same-origin allow-popups"
                  allow="autoplay"
                  className="w-full h-[402px] border-none"
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
              
            </div>
          </section>
        )}
      </section>

      {/* OVERVIEW */}
      <Section>
        <motion.div {...fadeUp()} className="max-w-3xl mx-auto text-center">
          <Tag>OVERVIEW</Tag>
          <p className="text-xl leading-relaxed mt-6" style={{ color: 'rgba(226,232,240,0.65)', fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}>
            A fast-paced 2D arcade shooter built as a final project for <Accent>Week 0 of Harvard's CS50x</Accent>. 
            Engineered from the ground up, bypassing standard visual engine constraints to implement <Accent>infinite parallax scrolling</Accent>, 
            localized radial particle physics, and a broadcast-driven UI state machine.
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
          {/* MAKE SURE THESE IMAGES ARE IN YOUR PUBLIC FOLDER */}
          {['/games/neon-void/Thumbnail.jpeg', '/games/neon-void/Win_Screen.jpeg', '/games/neon-void/Lose_Screen.jpeg'].map((src, i) => (
            <motion.div
              key={src}
              {...fadeUp(i * 0.1)}
              className="rounded-xl overflow-hidden"
              style={{ border: '1px solid rgba(236,72,153,0.2)', boxShadow: '0 0 30px rgba(236,72,153,0.06)' }}
            >
              <img src={src} alt={`Neon Void screenshot ${i + 1}`} className="w-full block object-cover" style={{ aspectRatio: '16/10' }} />
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
            EXPLORE THE ENGINE
          </h2>
          <p className="mb-10 text-lg" style={{ color: 'rgba(226,232,240,0.5)' }}>
            Explore the full source — every state transition, every particle vector, every laser.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/DarshJaipuria/neon-void"
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