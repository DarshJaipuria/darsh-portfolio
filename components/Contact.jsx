'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const EMAIL = 'darshjaipuria6a@gmail.com';

function FloatingParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${Math.random() * 4 + 1}px`,
            height: `${Math.random() * 4 + 1}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: ['#a855f7', '#3b82f6', '#ec4899'][i % 3],
            opacity: Math.random() * 0.4 + 0.1,
            animation: `float ${Math.random() * 4 + 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function Contact() {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' });

  const handleEmail = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 2000);
    window.location.href = `mailto:${EMAIL}`;
  };

  return (
    <section
      id="contact"
      className="relative py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050505 0%, #0a0510 50%, #050505 100%)' }}
    >
      <FloatingParticles />

      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(168,85,247,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.4) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Central glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(168,85,247,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        {/* Header */}
        <div ref={titleRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="text-xs font-mono tracking-[0.5em] text-purple-400/50 block mb-4">
              05 // INITIATE CONTACT
            </span>
            <h2 className="section-title gradient-text mb-4">CONTACT</h2>
            <p
              className="text-xl max-w-xl mx-auto mb-16"
              style={{ color: 'rgba(226,232,240,0.5)', fontFamily: 'Rajdhani, sans-serif' }}
            >
              Have an idea? A project? A challenge that feels impossible? Let's talk.
            </p>
          </motion.div>
        </div>

        {/* Glass contact card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative p-8 md:p-12 rounded-3xl overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(168,85,247,0.2)',
            backdropFilter: 'blur(30px)',
            boxShadow: '0 0 60px rgba(168,85,247,0.08), inset 0 0 60px rgba(168,85,247,0.03)',
          }}
        >
          {/* Top accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #a855f7, #3b82f6, #ec4899, transparent)' }}
          />

          {/* Corner accents */}
          {[
            'top-4 left-4 border-t-2 border-l-2',
            'top-4 right-4 border-t-2 border-r-2',
            'bottom-4 left-4 border-b-2 border-l-2',
            'bottom-4 right-4 border-b-2 border-r-2',
          ].map((cls, i) => (
            <div
              key={i}
              className={`absolute w-6 h-6 ${cls}`}
              style={{ borderColor: 'rgba(168,85,247,0.4)' }}
            />
          ))}

          {/* Email display */}
          <div className="mb-8">
            <p className="text-xs font-mono tracking-[0.4em] text-purple-400/40 mb-2">REACH ME AT</p>
            <div
              className="text-lg md:text-2xl font-bold tracking-wider"
              style={{
                fontFamily: 'Share Tech Mono, monospace',
                background: 'linear-gradient(135deg, #a855f7, #3b82f6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {EMAIL}
            </div>
          </div>

          {/* Big CTA button */}
          <button
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={handleEmail}
            className="relative overflow-hidden rounded-xl w-full md:w-auto px-12 py-4 text-sm font-black tracking-[0.2em] uppercase transition-all duration-300"
            style={{
              fontFamily: 'Orbitron, monospace',
              cursor: 'none',
              background: clicked
                ? 'linear-gradient(135deg, #10b981, #06b6d4)'
                : hovered
                ? 'linear-gradient(135deg, #ec4899, #a855f7, #3b82f6)'
                : 'linear-gradient(135deg, #a855f7, #3b82f6)',
              color: '#fff',
              boxShadow: hovered
                ? '0 0 40px rgba(168,85,247,0.5), 0 0 80px rgba(168,85,247,0.2)'
                : '0 0 20px rgba(168,85,247,0.3)',
              transform: hovered ? 'translateY(-2px) scale(1.02)' : 'none',
            }}
          >
            {/* Shimmer sweep */}
            {hovered && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                transition={{ duration: 0.6 }}
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                }}
              />
            )}
            <span className="relative z-10">
              {clicked ? '✓ Opening Mail Client...' : '⚡ Send a Message'}
            </span>
          </button>

          {/* Social links row */}
          <div className="flex items-center justify-center gap-6 mt-8 pt-8" style={{ borderTop: '1px solid rgba(168,85,247,0.1)' }}>
            {[
              {
                label: 'GitHub',
                href: 'https://github.com/DarshJaipuria',
                icon: (
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                ),
              },
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/in/darshjaipuria/',
                icon: (
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                ),
              },
              {
                label: 'Instagram',
                href: 'https://www.instagram.com/darshjaipuria',
                icon: (
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                  </svg>
                ),
              },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-500 hover:text-purple-300 transition-colors text-sm font-mono"
                style={{ cursor: 'none' }}
                whileHover={{ y: -2 }}
              >
                {social.icon}
                <span className="text-xs tracking-widest">{social.label.toUpperCase()}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Response time indicator */}
        <motion.p
          className="mt-6 text-xs font-mono text-purple-400/30 tracking-widest"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          ⚡ TYPICAL RESPONSE: WITHIN 24 HOURS
        </motion.p>
      </div>
    </section>
  );
}
