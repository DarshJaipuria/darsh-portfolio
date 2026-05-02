'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

// Three.js canvas for particle field
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let THREE, renderer, scene, camera, particles, animId;

    async function init() {
      const mod = await import('three');
      THREE = mod;

      const canvas = canvasRef.current;
      if (!canvas) return;

      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 80;

      // Particle system
      const COUNT = 2000;
      const geo = new THREE.BufferGeometry();
      const positions = new Float32Array(COUNT * 3);
      const colors = new Float32Array(COUNT * 3);
      const sizes = new Float32Array(COUNT);

      const colorChoices = [
        [0.66, 0.33, 0.97], // purple
        [0.23, 0.51, 0.96], // blue
        [0.93, 0.28, 0.60], // pink
        [0.02, 0.71, 0.83], // cyan
      ];

      for (let i = 0; i < COUNT; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 300;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 300;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 150;

        const c = colorChoices[Math.floor(Math.random() * colorChoices.length)];
        colors[i * 3] = c[0];
        colors[i * 3 + 1] = c[1];
        colors[i * 3 + 2] = c[2];

        sizes[i] = Math.random() * 2 + 0.5;
      }

      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      const mat = new THREE.PointsMaterial({
        size: 0.8,
        vertexColors: true,
        transparent: true,
        opacity: 0.7,
        sizeAttenuation: true,
      });

      particles = new THREE.Points(geo, mat);
      scene.add(particles);

      // Mouse parallax
      let mouseX = 0, mouseY = 0;
      const onMouse = (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener('mousemove', onMouse);

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', onResize);

      let t = 0;
      const animate = () => {
        animId = requestAnimationFrame(animate);
        t += 0.003;

        particles.rotation.y = t * 0.05 + mouseX * 0.05;
        particles.rotation.x = t * 0.02 + mouseY * 0.03;

        // Subtle wave
        const pos = particles.geometry.attributes.position.array;
        for (let i = 0; i < COUNT; i += 20) {
          pos[i * 3 + 1] += Math.sin(t + i * 0.01) * 0.015;
        }
        particles.geometry.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
      };
      animate();

      return () => {
        window.removeEventListener('mousemove', onMouse);
        window.removeEventListener('resize', onResize);
      };
    }

    const cleanup = init();

    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (renderer) renderer.dispose();
      cleanup.then((fn) => fn && fn());
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  );
}

// Glitch text animation
function GlitchText({ text, className, style }) {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const scheduleGlitch = () => {
      const delay = Math.random() * 4000 + 2000;
      setTimeout(() => {
        setGlitching(true);
        setTimeout(() => {
          setGlitching(false);
          scheduleGlitch();
        }, 300);
      }, delay);
    };
    scheduleGlitch();
  }, []);

  return (
    <span
      className={className}
      style={{
        ...style,
        position: 'relative',
        display: 'inline-block',
        animation: glitching ? 'glitch 0.3s steps(1) 3' : 'none',
      }}
    >
      {text}
      {glitching && (
        <>
          <span
            style={{
              position: 'absolute',
              inset: 0,
              color: '#ec4899',
              clipPath: 'inset(30% 0 50% 0)',
              transform: 'translateX(-3px)',
              opacity: 0.7,
            }}
          >
            {text}
          </span>
          <span
            style={{
              position: 'absolute',
              inset: 0,
              color: '#3b82f6',
              clipPath: 'inset(60% 0 10% 0)',
              transform: 'translateX(3px)',
              opacity: 0.7,
            }}
          >
            {text}
          </span>
        </>
      )}
    </span>
  );
}

// Social icon
function SocialIcon({ href, icon, label }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-1 group"
      style={{ cursor: 'none' }}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 400 }}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center text-purple-300 group-hover:text-white transition-all"
        style={{
          background: 'rgba(168,85,247,0.08)',
          border: '1px solid rgba(168,85,247,0.2)',
          backdropFilter: 'blur(10px)',
        }}
      >
        {icon}
      </div>
      <span className="text-xs text-purple-400/50 group-hover:text-purple-300 transition-colors font-mono tracking-wider">
        {label}
      </span>
    </motion.a>
  );
}

export default function Hero() {
  const containerRef = useRef(null);
  const router = useRouter();

  // Mouse parallax on elements
  useEffect(() => {
    const handler = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      if (containerRef.current) {
        containerRef.current.style.setProperty('--mx', `${x}px`);
        containerRef.current.style.setProperty('--my', `${y}px`);
      }
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  const scrollToSection = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#050505' }}
    >
      {/* Three.js particle background */}
      <ParticleCanvas />

      {/* Radial gradient overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(168,85,247,0.12) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #050505, transparent)' }}
      />

      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'linear-gradient(rgba(168,85,247,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.15) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        }}
      />

      {/* Horizontal scan lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(168,85,247,0.015) 3px, rgba(168,85,247,0.015) 4px)',
        }}
      />

      {/* Main hero content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 text-center">

        {/* Status badge */}
        <motion.div
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            background: 'rgba(168,85,247,0.08)',
            border: '1px solid rgba(168,85,247,0.25)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <span className="w-2 h-2 rounded-full bg-green-400" style={{ boxShadow: '0 0 8px rgba(74,222,128,0.8)', animation: 'pulse 2s infinite' }} />
          <span className="text-xs font-mono text-green-400/80 tracking-widest">AVAILABLE FOR WORK</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 leading-none font-black"
          style={{ fontFamily: 'Orbitron, monospace' }}
        >
          <span
            className="block text-white/10 text-xl tracking-[0.6em] mb-4 font-normal"
            style={{ fontFamily: 'Share Tech Mono, monospace' }}
          >
            {'// INTRODUCING'}
          </span>
          <GlitchText
            text="DARSH"
            style={{
              fontSize: 'clamp(5rem, 18vw, 14rem)',
              background: 'linear-gradient(135deg, #fff 20%, rgba(168,85,247,0.8) 50%, #fff 80%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.02em',
              textShadow: 'none',
            }}
          />
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="text-xl md:text-3xl font-medium mb-2 tracking-wide"
          style={{ fontFamily: 'Rajdhani, sans-serif', color: 'rgba(226,232,240,0.8)' }}
        >
          I build things that{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #a855f7, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            feel alive.
          </span>
        </motion.p>

        {/* Sub tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-sm font-mono text-purple-400/50 tracking-[0.3em] mb-12"
        >
          AI • DATA SCIENCE • INTERACTIVE EXPERIENCES
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={() => scrollToSection('#projects')}
            className="btn-cyber-solid rounded-none px-8 py-3 text-sm font-bold tracking-widest"
            style={{ cursor: 'none' }}
          >
            View Projects
          </button>
          <button
            onClick={() => scrollToSection('#contact')}
            className="btn-cyber rounded-none px-8 py-3 text-sm"
            style={{ cursor: 'none' }}
          >
            Contact Me
          </button>
          <button
            onClick={() => router.push('/about')}
            className="btn-cyber rounded-none px-8 py-3 text-sm"
            style={{ cursor: 'none', borderColor: 'rgba(236,72,153,0.6)', color: '#ec4899' }}
          >
            Know Me &amp; View CV
          </button>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex items-center justify-center gap-6"
        >
          <SocialIcon
            href="https://github.com/DarshJaipuria"
            label="GitHub"
            icon={
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            }
          />
          <SocialIcon
            href="https://www.linkedin.com/in/darshjaipuria/"
            label="LinkedIn"
            icon={
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            }
          />
          <SocialIcon
            href="https://www.instagram.com/darshjaipuria"
            label="Instagram"
            icon={
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
            }
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        initial={{ opacity: 0 }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-xs font-mono text-purple-400/40 tracking-[0.3em]">SCROLL</span>
          <div className="w-px h-8 bg-gradient-to-b from-purple-500/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}