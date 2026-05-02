'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const PROJECTS = [
  {
    id: 1,
    title: 'Hand Cricket',
    subtitle: 'Game Engine',
    desc: 'A fully functional Hand Cricket game built in Python with complete game logic, player vs CPU mode, scoring system, and terminal-based UI.',
    longDesc: 'Hand Cricket brings the classic schoolyard game into the digital world. Built with pure Python — complete game logic, intelligent CPU moves, live score tracking, innings management, and a polished terminal interface with colored output.',
    tech: ['Python', 'Game Logic', 'Terminal UI', 'OOP'],
    link: 'https://github.com/DarshJaipuria/hand-cricket-python',
    color: '#a855f7',
    accent: '#ec4899',
    icon: '🏏',
    category: 'GAME',
    gradient: 'radial-gradient(ellipse 80% 60% at 40% 30%, rgba(168,85,247,0.15), transparent 60%)',
  },
  {
    id: 2,
    title: 'Face Auth System',
    subtitle: 'AI Security',
    desc: 'Production-grade face authentication using computer vision and deep learning. Register faces, authenticate in real-time — all with a webcam.',
    longDesc: 'A complete biometric security system powered by computer vision. Uses OpenCV for real-time face detection and a trained model for identity verification. Features: face enrollment, live video authentication, confidence scoring, and a clean CLI interface.',
    tech: ['Python', 'OpenCV', 'Face Recognition', 'NumPy', 'PIL'],
    link: 'https://github.com/DarshJaipuria/face-authentication-system',
    color: '#3b82f6',
    accent: '#06b6d4',
    icon: '👁️',
    category: 'AI / CV',
    gradient: 'radial-gradient(ellipse 80% 60% at 60% 20%, rgba(59,130,246,0.15), transparent 60%)',
  },
  {
    id: 3,
    title: 'Nitro Rush 3D',
    subtitle: '3D Racing Game',
    desc: 'A high-speed 3D racing game built from scratch with custom physics, procedural track generation, particle effects, and adrenaline-pumping gameplay.',
    longDesc: 'Browser-based 3D racing game built with Three.js. Features custom vehicle physics, procedural road generation, dynamic camera systems, particle exhaust trails, speed boost mechanics, collision detection, and a high-score system.',
    tech: ['Three.js', 'JavaScript', 'WebGL', '3D Physics', 'GSAP'],
    link: 'https://github.com/DarshJaipuria/nitro-rush-3d',
    color: '#ec4899',
    accent: '#f59e0b',
    icon: '🏎️',
    category: '3D / GAME',
    gradient: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(236,72,153,0.15), transparent 60%)',
  },
];

function TiltCard({ project, onClick, onHover }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const onMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 22;
    const y = -((e.clientX - rect.left) / rect.width - 0.5) * 22;
    setTilt({ x, y });
  };

  const onLeave = () => { setTilt({ x: 0, y: 0 }); setHovered(false); onHover(null); };
  const onEnter = () => { setHovered(true); onHover(project); };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onClick={() => onClick(project)}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${hovered ? 'translateZ(12px)' : ''}`,
          transition: hovered ? 'transform 0.05s' : 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          cursor: 'none',
        }}
        className="relative rounded-2xl overflow-hidden group"
      >
        <div
          className="absolute inset-0"
          style={{
            background: `${project.gradient}, rgba(10,10,20,0.9)`,
            border: `1px solid ${project.color}25`,
          }}
        />
        {/* Animated breathing border on hover */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-500"
          style={{
            boxShadow: hovered ? `0 0 50px ${project.color}30, inset 0 0 50px ${project.color}06` : 'none',
            border: `1px solid ${hovered ? project.color + '60' : 'transparent'}`,
          }}
        />

        <div className="relative p-6 z-10">
          <div className="flex items-center justify-between mb-4">
            <span
              className="text-xs font-mono px-2.5 py-1 rounded-full tracking-widest"
              style={{ background: `${project.color}18`, color: project.color, border: `1px solid ${project.color}30` }}
            >
              {project.category}
            </span>
            <span className="text-2xl" style={{ filter: hovered ? `drop-shadow(0 0 8px ${project.color})` : 'none', transition: 'filter 0.3s' }}>
              {project.icon}
            </span>
          </div>

          <div className="text-7xl font-black leading-none mb-2 select-none" style={{ fontFamily: 'Orbitron, monospace', color: `${project.color}12` }}>
            0{project.id}
          </div>

          <h3
            className="text-2xl font-black mb-1 transition-transform duration-300"
            style={{ fontFamily: 'Orbitron, monospace', color: '#fff', transform: hovered ? 'translateX(4px)' : 'none' }}
          >
            {project.title}
          </h3>
          <p className="text-sm font-mono mb-4" style={{ color: project.color }}>{project.subtitle}</p>
          <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(226,232,240,0.55)', fontFamily: 'Rajdhani, sans-serif' }}>
            {project.desc}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map(t => (
              <span key={t} className="text-xs px-2 py-0.5 rounded font-mono" style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(168,85,247,0.7)', border: '1px solid rgba(168,85,247,0.12)' }}>
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <button
              className="text-xs font-bold tracking-widest uppercase flex items-center gap-2 group/btn"
              style={{ fontFamily: 'Orbitron, monospace', color: project.color, cursor: 'none' }}
              onClick={(e) => { e.stopPropagation(); onClick(project); }}
            >
              View Details
              <span className="transition-transform duration-200 group-hover/btn:translate-x-1">→</span>
            </button>
            <a
              href={project.link} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="text-xs font-mono text-slate-500 hover:text-white transition-colors flex items-center gap-1"
              style={{ cursor: 'none' }}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Fullscreen cinematic modal
function CinematicModal({ project, onClose }) {
  useEffect(() => {
    const fn = e => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', fn);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', fn); document.body.style.overflow = ''; };
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0"
            initial={{ backdropFilter: 'blur(0px)' }}
            animate={{ backdropFilter: 'blur(24px)' }}
            exit={{ backdropFilter: 'blur(0px)' }}
            style={{ background: 'rgba(5,5,5,0.94)' }}
          />

          {/* Background gradient reaction */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ background: project.gradient.replace('0.15', '0.08') }}
          />

          <motion.div
            className="relative w-full max-w-2xl rounded-2xl overflow-hidden z-10"
            initial={{ scale: 0.8, y: 60, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.85, y: 40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            onClick={e => e.stopPropagation()}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at 30% 0%, ${project.color}20, transparent 50%), #0a0a14`,
                border: `1px solid ${project.color}35`,
              }}
            />
            <div
              className="absolute top-0 left-0 right-0 h-0.5"
              style={{ background: `linear-gradient(90deg, transparent, ${project.color}, ${project.accent}, transparent)` }}
            />

            <div className="relative p-8">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-colors text-sm"
                style={{ background: 'rgba(255,255,255,0.06)', cursor: 'none' }}
              >✕</button>

              {/* Sequential content animation */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl flex-shrink-0" style={{ background: `${project.color}18`, border: `1px solid ${project.color}35` }}>
                  {project.icon}
                </div>
                <div>
                  <span className="text-xs font-mono tracking-widest mb-1 block" style={{ color: project.color }}>{project.category}</span>
                  <h3 className="text-2xl font-black" style={{ fontFamily: 'Orbitron, monospace', color: '#fff' }}>{project.title}</h3>
                  <p className="text-sm font-mono" style={{ color: project.color }}>{project.subtitle}</p>
                </div>
              </motion.div>

              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-base leading-relaxed mb-6 text-slate-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                {project.longDesc}
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="flex flex-wrap gap-2 mb-8">
                {project.tech.map(t => (
                  <span key={t} className="text-xs px-3 py-1 rounded-full font-mono" style={{ background: `${project.color}12`, color: project.color, border: `1px solid ${project.color}25` }}>
                    {t}
                  </span>
                ))}
              </motion.div>

              <motion.a
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-3 text-sm font-black tracking-widest rounded-lg text-white"
                style={{
                  fontFamily: 'Orbitron, monospace',
                  background: `linear-gradient(135deg, ${project.color}, ${project.accent})`,
                  boxShadow: `0 0 20px ${project.color}40`,
                  cursor: 'none',
                }}
              >
                View on GitHub →
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState(null);
  const [bgProject, setBgProject] = useState(null);
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' });

  return (
    <section
      id="projects"
      className="relative py-32 overflow-hidden"
      style={{ background: '#050505' }}
    >
      {/* Dynamic background reaction */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700"
        style={{ background: bgProject ? bgProject.gradient.replace('0.15', '0.06') : 'none' }}
      />
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(rgba(168,85,247,0.8) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div ref={titleRef} className="mb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={titleInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
            <span className="text-xs font-mono tracking-[0.5em] text-purple-400/50 block mb-4">02 // BUILT WITH OBSESSION</span>
            <h2
              className="mb-4"
              style={{
                fontFamily: 'Orbitron, monospace', fontWeight: 900,
                fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1,
                background: 'linear-gradient(135deg, #a855f7, #3b82f6, #ec4899)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}
            >
              PROJECTS
            </h2>
            <p className="text-lg max-w-xl" style={{ color: 'rgba(226,232,240,0.5)', fontFamily: 'Rajdhani, sans-serif' }}>
              Not assignments. Not tutorials. Real systems, real ideas, real code.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" onMouseLeave={() => setBgProject(null)}>
          {PROJECTS.map(project => (
            <div key={project.id} onMouseEnter={() => setBgProject(project)}>
              <TiltCard project={project} onClick={setSelected} onHover={setBgProject} />
            </div>
          ))}
        </div>

        <motion.div className="text-center mt-14" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <a
            href="https://github.com/DarshJaipuria"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-sm font-mono text-purple-400/60 hover:text-purple-300 transition-colors tracking-widest"
            style={{ cursor: 'none' }}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            MORE ON GITHUB →
          </a>
        </motion.div>
      </div>

      <CinematicModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
