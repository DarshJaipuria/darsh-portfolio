'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOADING_LINES = [
  '> INITIALIZING DARSH.EXE...',
  '> LOADING NEURAL NETWORKS...',
  '> CALIBRATING REALITY ENGINE...',
  '> INJECTING CREATIVITY.js...',
  '> COMPILING PASSION MODULES...',
  '> EXPERIENCE READY.',
];

export default function Loader({ onComplete }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [chars, setChars] = useState('');
  const [charIndex, setCharIndex] = useState(0);

  // Typewriter per line
  useEffect(() => {
    if (currentLine >= LOADING_LINES.length) return;

    const line = LOADING_LINES[currentLine];
    if (charIndex < line.length) {
      const t = setTimeout(() => {
        setChars((p) => p + line[charIndex]);
        setCharIndex((p) => p + 1);
      }, 28);
      return () => clearTimeout(t);
    } else {
      // Line done — move to next after short pause
      const t = setTimeout(() => {
        setCurrentLine((p) => p + 1);
        setChars('');
        setCharIndex(0);
      }, 250);
      return () => clearTimeout(t);
    }
  }, [currentLine, charIndex]);

  // Progress bar
  useEffect(() => {
    const target = Math.min(((currentLine) / LOADING_LINES.length) * 100, 100);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= target) { clearInterval(interval); return p; }
        return p + 0.8;
      });
    }, 16);
    return () => clearInterval(interval);
  }, [currentLine]);

  // Trigger exit
  useEffect(() => {
    if (currentLine >= LOADING_LINES.length) {
      const t = setTimeout(() => setDone(true), 600);
      return () => clearTimeout(t);
    }
  }, [currentLine]);

  useEffect(() => {
    if (done) {
      const t = setTimeout(onComplete, 800);
      return () => clearTimeout(t);
    }
  }, [done, onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-dark-base overflow-hidden"
          style={{ background: '#050505' }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Scanline sweep */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(168,85,247,0.03) 2px, rgba(168,85,247,0.03) 4px)',
            }}
          />

          {/* Animated scan beam */}
          <motion.div
            className="absolute left-0 right-0 h-0.5 opacity-30"
            style={{ background: 'linear-gradient(90deg, transparent, #a855f7, transparent)' }}
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />

          {/* Corner decorations */}
          {['top-6 left-6', 'top-6 right-6', 'bottom-6 left-6', 'bottom-6 right-6'].map((pos, i) => (
            <div
              key={i}
              className={`absolute ${pos} w-8 h-8`}
              style={{
                border: '1px solid rgba(168,85,247,0.5)',
                borderRadius: '2px',
                boxShadow: '0 0 10px rgba(168,85,247,0.3)',
              }}
            />
          ))}

          {/* Center content */}
          <div className="relative z-10 w-full max-w-lg px-8">
            {/* Logo */}
            <motion.div
              className="mb-10 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div
                className="text-5xl font-black tracking-wider mb-1"
                style={{
                  fontFamily: 'Orbitron, monospace',
                  background: 'linear-gradient(135deg, #a855f7, #3b82f6, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                DARSH
              </div>
              <div
                className="text-xs tracking-[0.5em] text-purple-400/60"
                style={{ fontFamily: 'Share Tech Mono, monospace' }}
              >
                DIGITAL ARCHITECT
              </div>
            </motion.div>

            {/* Terminal window */}
            <motion.div
              className="rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                background: 'rgba(10,10,20,0.9)',
                border: '1px solid rgba(168,85,247,0.2)',
                boxShadow: '0 0 40px rgba(168,85,247,0.1)',
              }}
            >
              {/* Terminal header */}
              <div
                className="flex items-center gap-2 px-4 py-2"
                style={{ background: 'rgba(168,85,247,0.08)', borderBottom: '1px solid rgba(168,85,247,0.1)' }}
              >
                {['#ec4899', '#a855f7', '#3b82f6'].map((c, i) => (
                  <div key={i} className="w-3 h-3 rounded-full" style={{ background: c, boxShadow: `0 0 6px ${c}` }} />
                ))}
                <span className="ml-2 text-xs font-mono text-purple-400/50">system.init</span>
              </div>

              {/* Terminal body */}
              <div className="p-5 min-h-[180px] font-mono text-sm" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
                {LOADING_LINES.slice(0, currentLine).map((line, i) => (
                  <div key={i} className="mb-1.5">
                    <span style={{ color: 'rgba(168,85,247,0.5)' }}>{'> '}</span>
                    <span style={{ color: 'rgba(100,220,160,0.8)' }}>{line.slice(2)}</span>
                  </div>
                ))}
                {currentLine < LOADING_LINES.length && (
                  <div className="mb-1.5">
                    <span style={{ color: 'rgba(168,85,247,0.5)' }}>{'> '}</span>
                    <span style={{ color: '#e2e8f0' }}>{chars.slice(2)}</span>
                    <span
                      className="inline-block w-2 h-4 ml-0.5 align-middle"
                      style={{
                        background: '#a855f7',
                        animation: 'blink 0.8s step-end infinite',
                      }}
                    />
                  </div>
                )}
              </div>
            </motion.div>

            {/* Progress bar */}
            <div className="mt-6">
              <div
                className="w-full h-0.5 rounded-full overflow-hidden"
                style={{ background: 'rgba(168,85,247,0.1)' }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #a855f7, #3b82f6, #ec4899)',
                    boxShadow: '0 0 10px rgba(168,85,247,0.8)',
                    transition: 'width 0.1s linear',
                  }}
                />
              </div>
              <div className="flex justify-between mt-1.5">
                <span className="text-xs font-mono text-purple-400/40">SYS.BOOT</span>
                <span className="text-xs font-mono text-purple-400/70">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
