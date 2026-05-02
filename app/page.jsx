'use client';

import { useEffect, useState, useRef } from 'react';
import Loader from '../components/Loader';
import CustomCursor from '../components/CustomCursor';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import GitHubStats from '../components/GitHubStats';
import Contact from '../components/Contact';

// Easter egg: type "darsh" anywhere to trigger global glitch mode
function useEasterEgg() {
  const [glitchMode, setGlitchMode] = useState(false);
  const buffer = useRef('');
  const timerRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      buffer.current = (buffer.current + e.key).slice(-5).toLowerCase();
      if (buffer.current === 'darsh') {
        buffer.current = '';
        setGlitchMode(true);
        document.body.classList.add('easter-glitch');
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          setGlitchMode(false);
          document.body.classList.remove('easter-glitch');
        }, 2000);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); clearTimeout(timerRef.current); };
  }, []);

  return glitchMode;
}

// FIX: Middle-mouse / left-button drag scroll (desktop only)
function useDragScroll() {
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    let isDragging = false;
    let startY = 0;
    let startScroll = 0;

    const onMouseDown = (e) => {
      // Middle mouse (button 1) or hold Alt + left click
      if (e.button !== 1 && !(e.button === 0 && e.altKey)) return;
      e.preventDefault();
      isDragging = true;
      startY = e.clientY;
      startScroll = window.scrollY;
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const delta = startY - e.clientY;
      window.scrollTo({ top: startScroll + delta, behavior: 'instant' });
    };

    const onMouseUp = () => {
      if (!isDragging) return;
      isDragging = false;
      document.body.style.cursor = 'none';
      document.body.style.userSelect = '';
    };

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    // Prevent middle-click auto-scroll from opening scroll mode
    window.addEventListener('auxclick', (e) => { if (e.button === 1) e.preventDefault(); });

    return () => {
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const glitchMode = useEasterEgg();
  useDragScroll();

  useEffect(() => {
    if (!loaded) return;

    // FIX: Skip Lenis on any touch device — native scroll works fine
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    import('lenis').then(({ default: Lenis }) => {
      const lenis = new Lenis({
        duration: 1.4,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        smoothTouch: false,
      });
      const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
      window.__lenis = lenis;
      return () => lenis.destroy();
    });
  }, [loaded]);

  return (
    <>
      {/* Easter egg global glitch CSS */}
      <style>{`
        @keyframes globalGlitch {
          0%   { filter: none; transform: none; }
          10%  { filter: hue-rotate(90deg) saturate(3); transform: translate(-2px, 1px); }
          20%  { filter: hue-rotate(180deg) invert(0.1); transform: translate(2px, -1px); }
          30%  { filter: hue-rotate(270deg) saturate(5); transform: translate(-1px, 2px); }
          40%  { filter: hue-rotate(0deg) brightness(1.5); transform: translate(1px, -2px); }
          50%  { filter: hue-rotate(90deg) contrast(2); transform: translate(-3px, 1px); }
          60%  { filter: hue-rotate(180deg); transform: translate(3px, -1px); }
          70%  { filter: none; transform: translate(-1px, 1px); }
          80%  { filter: hue-rotate(270deg) saturate(2); transform: translate(2px, 2px); }
          90%  { filter: brightness(2); transform: translate(-2px, -1px); }
          100% { filter: none; transform: none; }
        }
        .easter-glitch {
          animation: globalGlitch 0.15s steps(1) infinite;
        }
        .easter-glitch::before {
          content: '';
          position: fixed; inset: 0; z-index: 99998;
          background: rgba(168,85,247,0.05);
          animation: globalGlitch 0.1s steps(1) infinite reverse;
          pointer-events: none;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .blink { animation: blink 0.8s step-end infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
        @keyframes pulseGlow {
          0%,100%{ box-shadow: 0 0 20px rgba(168,85,247,0.3); }
          50%{ box-shadow: 0 0 40px rgba(168,85,247,0.6), 0 0 80px rgba(168,85,247,0.2); }
        }
        @keyframes glitch {
          0%,100%{text-shadow:none;transform:translate(0)}
          20%{text-shadow:-2px 0 #ec4899, 2px 0 #3b82f6;transform:translate(-2px,1px)}
          40%{text-shadow:2px 0 #ec4899, -2px 0 #3b82f6;transform:translate(2px,-1px)}
          60%{text-shadow:-1px 0 #ec4899, 1px 0 #3b82f6;transform:translate(-1px,2px)}
          80%{text-shadow:1px 0 #ec4899, -1px 0 #3b82f6;transform:translate(1px,-2px)}
        }
      `}</style>

      {/* Easter egg notification */}
      {glitchMode && (
        <div
          className="fixed top-20 left-1/2 z-[99999] -translate-x-1/2 px-6 py-3 rounded-full font-mono text-xs tracking-widest text-white"
          style={{
            background: 'linear-gradient(135deg, #a855f7, #ec4899)',
            boxShadow: '0 0 30px rgba(168,85,247,0.8)',
            fontFamily: 'Share Tech Mono, monospace',
          }}
        >
          ⚡ DARSH MODE ACTIVATED ⚡
        </div>
      )}

      <CustomCursor />
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}

      <div className={`transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Noise grain */}
        <div
          className="fixed inset-0 pointer-events-none z-50"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
            opacity: 0.35,
          }}
        />

        <Navigation />
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <GitHubStats />
          <Contact />
        </main>

        <footer className="py-8 text-center border-t border-purple-900/20">
          <p className="font-mono text-xs text-purple-400/30 tracking-[0.3em]">
            DARSH.EXE — RUNNING ON PASSION + CAFFEINE © 26
          </p>
          <p className="font-mono text-xs text-purple-400/15 tracking-widest mt-1" style={{ fontSize: '0.6rem' }}>
            [ TRY TYPING "DARSH" ]
          </p>
        </footer>
      </div>
    </>
  );
}