'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const SKILLS = [
  {name: 'SQL',              level: 80, color: '#336791', icon: '🗄️', desc: 'Writing queries, joins, views, transactions, and relational database operations for data analysis and management.', category: 'Data', projects: []},
  { name: 'Python',          level: 90, color: '#3b82f6', icon: '🐍', desc: 'Primary language. AI, data science, automation, scripting.', category: 'Language',  projects: ['Face Auth System', 'Hand Cricket'] },
  { name: 'HTML / CSS',      level: 85, color: '#f97316', icon: '🌐', desc: 'Semantic HTML5, modern CSS with animations and layouts.', category: 'Frontend',  projects: [] },
  { name: 'JavaScript',      level: 80, color: '#eab308', icon: '⚡', desc: 'DOM manipulation, async patterns, and browser APIs.', category: 'Language',  projects: ['Nitro Rush 3D'] },
  { name: 'Three.js',        level: 72, color: '#a855f7', icon: '🎮', desc: '3D graphics in the browser. WebGL-powered scenes, particles.', category: 'Graphics', projects: ['Nitro Rush 3D'] },
  { name: 'GitHub',          level: 88, color: '#e2e8f0', icon: '🐙', desc: 'Version control, branching strategies, CI/CD workflows.', category: 'Tools',    projects: [] },
  { name: 'Jupyter',         level: 82, color: '#f59e0b', icon: '📓', desc: 'Data exploration, visualization, reproducible science.', category: 'Tools',    projects: [] },
  { name: 'Scikit-learn',    level: 75, color: '#06b6d4', icon: '🤖', desc: 'ML pipelines, classification, regression, clustering.', category: 'AI/ML',    projects: [] },
  { name: 'Data Storytelling',level: 80, color: '#ec4899', icon: '📊', desc: 'Turning raw data into compelling, actionable narratives.', category: 'Soft Skill', projects: [] },
  { name: 'Pandas', level: 84, color: '#150458', icon: '🐼', desc: 'Data manipulation, cleaning, transformation, and analysis using Python Pandas.', category: 'Data', projects: [] },
  { name: 'Data Analysis', level: 82, color: '#FF6F00', icon: '📊', desc: 'Exploring datasets, extracting insights, statistical understanding, and analytical workflows.', category: 'Data', projects: [] },
  { name: 'Web Scraping', level: 76, color: '#FF9800', icon: '🕸️', desc: 'Collecting and extracting structured data from websites using Python automation.', category: 'Data', projects: [] },
  { name: 'Data Visualization', level: 80, color: '#4CAF50', icon: '📈', desc: 'Creating dashboards, charts, and visual insights using Python libraries.', category: 'Data', projects: [] },
];

export default function Skills() {
  const [activeSkill, setActiveSkill] = useState(null);
  const [clickedSkill, setClickedSkill] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(true); // default true — avoids 500px orbit flashing on mobile before hydration

  const titleRef = useRef(null);
  const orbitRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' });
  const rafRef = useRef(null);
  const rotRef = useRef(0);
  const pausedRef = useRef(false);

  // Detect mobile — default true to avoid SSR flash with oversized orbit
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Track touch start Y to distinguish tap vs scroll
  const touchStartY = useRef(0);

  // Orbit auto-rotation — always running (mobile + desktop)
  useEffect(() => {
    let last = 0;
    // Mobile rotates faster for visible motion
    const speed = isMobile ? 0.012 : 0.005;
    const animate = (time) => {
      if (!pausedRef.current) {
        rotRef.current += (time - last) * speed;
        setRotation(rotRef.current);
      }
      last = time;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isMobile]);

  // Mouse parallax — desktop only
  useEffect(() => {
    if (isMobile) return;
    const onMove = (e) => {
      if (!orbitRef.current) return;
      const rect = orbitRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      setMouseOffset({
        x: (e.clientX - cx) / rect.width * 18,
        y: (e.clientY - cy) / rect.height * 18,
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [isMobile]);

  const handleSkillClick = (skill) => {
    setClickedSkill(prev => prev?.name === skill.name ? null : skill);
    pausedRef.current = !pausedRef.current || clickedSkill?.name !== skill.name;
  };

  const displaySkill = clickedSkill || activeSkill;

  // Responsive orbit size
  const orbitSize = isMobile ? 300 : 500;
  const orbitRadius = isMobile ? 120 : 200;

  return (
    <section
      id="skills"
      className="relative py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050505 0%, #08040f 50%, #050505 100%)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(59,130,246,0.04), transparent 70%)' }}
      />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div ref={titleRef} className="text-center mb-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={titleInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
            <span className="text-xs font-mono tracking-[0.5em] text-purple-400/50 block mb-4">03 // ARSENAL</span>
            <h2
              className="mb-4"
              style={{
                fontFamily: 'Orbitron, monospace', fontWeight: 900,
                fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1,
                background: 'linear-gradient(135deg, #a855f7, #3b82f6, #ec4899)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}
            >
              SKILLS
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: 'rgba(226,232,240,0.5)', fontFamily: 'Rajdhani, sans-serif' }}>
              Technologies I wield. Each chosen with purpose, sharpened with practice.
            </p>
          </motion.div>
        </div>

        {/* Desktop layout: orbit + detail panel side by side */}
        <div className="hidden lg:flex items-center justify-center gap-16">
          <div
            ref={orbitRef}
            className="relative flex-shrink-0"
            style={{
              width: `${orbitSize}px`, height: `${orbitSize}px`,
              transform: `perspective(800px) rotateX(${mouseOffset.y * 0.3}deg) rotateY(${mouseOffset.x * 0.3}deg)`,
              transition: 'transform 0.1s ease',
            }}
          >
            {[400, 280, 160].map((size, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${size}px`, height: `${size}px`,
                  top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  border: `1px ${i === 0 ? 'dashed' : 'solid'} rgba(168,85,247,${0.06 + i * 0.03})`,
                }}
              />
            ))}

            <motion.div
              className="absolute rounded-full flex flex-col items-center justify-center z-20 overflow-hidden"
              style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
              animate={{ width: clickedSkill ? 120 : 80, height: clickedSkill ? 120 : 80 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: clickedSkill
                    ? `radial-gradient(circle, ${clickedSkill.color}40, ${clickedSkill.color}10)`
                    : 'radial-gradient(circle, rgba(168,85,247,0.3), rgba(168,85,247,0.05))',
                  border: `2px solid ${clickedSkill ? clickedSkill.color + '70' : 'rgba(168,85,247,0.5)'}`,
                  boxShadow: clickedSkill
                    ? `0 0 30px ${clickedSkill.color}50, 0 0 60px ${clickedSkill.color}20`
                    : '0 0 30px rgba(168,85,247,0.3)',
                  transition: 'all 0.4s',
                }}
              />
              <div className="relative z-10 text-center px-2">
                {clickedSkill ? (
                  <>
                    <div className="text-xl mb-0.5">{clickedSkill.icon}</div>
                    <div className="text-xs font-black leading-tight" style={{ fontFamily: 'Orbitron, monospace', color: clickedSkill.color, fontSize: '0.55rem' }}>
                      {clickedSkill.name}
                    </div>
                  </>
                ) : (
                  <span className="text-xs font-black tracking-wider" style={{ fontFamily: 'Orbitron, monospace', color: '#a855f7' }}>DARSH</span>
                )}
              </div>
            </motion.div>

            <div
              className="absolute inset-0"
              style={{
                transform: `rotate(${rotation}deg) rotateX(${mouseOffset.y * 0.15}deg) rotateY(${mouseOffset.x * 0.15}deg)`,
              }}
            >
              {SKILLS.map((skill, i) => {
                const angle = (i / SKILLS.length) * 2 * Math.PI - Math.PI / 2;
                const x = Math.cos(angle) * orbitRadius;
                const y = Math.sin(angle) * orbitRadius;
                const isActive = activeSkill?.name === skill.name || clickedSkill?.name === skill.name;
                const glowSize = (skill.level / 100) * 20;

                return (
                  <div
                    key={skill.name}
                    className="absolute flex flex-col items-center cursor-none"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: `translate(-50%, -50%) rotate(${-rotation}deg)`,
                    }}
                    onMouseEnter={() => setActiveSkill(skill)}
                    onMouseLeave={() => setActiveSkill(null)}
                    onClick={() => handleSkillClick(skill)}
                  >
                    <motion.div
                      whileHover={{ scale: 1.25 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                      style={{
                        background: isActive ? `radial-gradient(circle, ${skill.color}40, ${skill.color}15)` : 'rgba(10,10,20,0.9)',
                        border: `2px solid ${isActive ? skill.color : skill.color + '50'}`,
                        boxShadow: isActive ? `0 0 ${glowSize}px ${skill.color}70, 0 0 ${glowSize * 2}px ${skill.color}20` : 'none',
                        transition: 'all 0.3s',
                      }}
                    >
                      {skill.icon}
                    </motion.div>
                    <span
                      className="mt-1.5 whitespace-nowrap transition-colors duration-300"
                      style={{
                        fontFamily: 'Share Tech Mono, monospace', fontSize: '0.6rem',
                        color: isActive ? skill.color : 'rgba(226,232,240,0.3)',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detail panel */}
          <div className="flex-1 max-w-sm">
            <SkillDetailPanel displaySkill={displaySkill} clickedSkill={clickedSkill} onDeselect={() => { setClickedSkill(null); pausedRef.current = false; }} />
          </div>
        </div>

        {/* Mobile layout: orbit centered + detail below */}
        <div className="lg:hidden flex flex-col items-center gap-8">
          {/* Tap hint */}
          <p className="text-xs font-mono text-purple-400/40 tracking-widest">TAP A NODE TO INSPECT</p>

          {/* Mobile orbit */}
          <div
            className="relative flex-shrink-0"
            style={{ width: `${orbitSize}px`, height: `${orbitSize}px` }}
          >
            {/* Rings — scaled for mobile */}
            {[240, 168, 96].map((size, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${size}px`, height: `${size}px`,
                  top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  border: `1px ${i === 0 ? 'dashed' : 'solid'} rgba(168,85,247,${0.06 + i * 0.03})`,
                }}
              />
            ))}

            {/* Center core */}
            <motion.div
              className="absolute rounded-full flex flex-col items-center justify-center z-20 overflow-hidden"
              style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
              animate={{ width: clickedSkill ? 80 : 56, height: clickedSkill ? 80 : 56 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: clickedSkill
                    ? `radial-gradient(circle, ${clickedSkill.color}40, ${clickedSkill.color}10)`
                    : 'radial-gradient(circle, rgba(168,85,247,0.3), rgba(168,85,247,0.05))',
                  border: `2px solid ${clickedSkill ? clickedSkill.color + '70' : 'rgba(168,85,247,0.5)'}`,
                  boxShadow: clickedSkill
                    ? `0 0 20px ${clickedSkill.color}50`
                    : '0 0 20px rgba(168,85,247,0.3)',
                  transition: 'all 0.4s',
                }}
              />
              <div className="relative z-10 text-center px-1">
                {clickedSkill ? (
                  <>
                    <div className="text-base">{clickedSkill.icon}</div>
                  </>
                ) : (
                  <span style={{ fontFamily: 'Orbitron, monospace', color: '#a855f7', fontSize: '0.45rem', fontWeight: 900, letterSpacing: '0.1em' }}>DARSH</span>
                )}
              </div>
            </motion.div>

            {/* Rotating skill nodes */}
            <div
              className="absolute inset-0"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              {SKILLS.map((skill, i) => {
                const angle = (i / SKILLS.length) * 2 * Math.PI - Math.PI / 2;
                const x = Math.cos(angle) * orbitRadius;
                const y = Math.sin(angle) * orbitRadius;
                const isActive = activeSkill?.name === skill.name || clickedSkill?.name === skill.name;
                const glowSize = (skill.level / 100) * 14;

                return (
                  <div
                    key={skill.name}
                    className="absolute flex flex-col items-center"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: `translate(-50%, -50%) rotate(${-rotation}deg)`,
                      // FIX: do NOT set touchAction:none — that blocks page scroll
                    }}
                    onMouseEnter={() => setActiveSkill(skill)}
                    onMouseLeave={() => setActiveSkill(null)}
                    onTouchStart={(e) => { touchStartY.current = e.touches[0].clientY; }}
                    onTouchEnd={(e) => {
                      // Only treat as tap if finger barely moved (not a scroll)
                      const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current);
                      if (dy < 10) handleSkillClick(skill);
                    }}
                    onClick={() => handleSkillClick(skill)}
                  >
                    <motion.div
                      whileTap={{ scale: 0.85 }}
                      className="w-9 h-9 rounded-full flex items-center justify-center text-base"
                      style={{
                        background: isActive ? `radial-gradient(circle, ${skill.color}40, ${skill.color}15)` : 'rgba(10,10,20,0.9)',
                        border: `2px solid ${isActive ? skill.color : skill.color + '50'}`,
                        boxShadow: isActive ? `0 0 ${glowSize}px ${skill.color}70` : 'none',
                        transition: 'all 0.3s',
                      }}
                    >
                      {skill.icon}
                    </motion.div>
                    <span
                      className="mt-1 whitespace-nowrap"
                      style={{
                        fontFamily: 'Share Tech Mono, monospace', fontSize: '0.5rem',
                        color: isActive ? skill.color : 'rgba(226,232,240,0.25)',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detail panel below orbit on mobile */}
          <div className="w-full max-w-sm">
            <SkillDetailPanel
              displaySkill={displaySkill}
              clickedSkill={clickedSkill}
              onDeselect={() => { setClickedSkill(null); pausedRef.current = false; }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillDetailPanel({ displaySkill, clickedSkill, onDeselect }) {
  return (
    <AnimatePresence mode="wait">
      {displaySkill ? (
        <motion.div
          key={displaySkill.name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="p-6 rounded-2xl"
          style={{
            background: `radial-gradient(ellipse at top, ${displaySkill.color}12, rgba(10,10,20,0.9))`,
            border: `1px solid ${displaySkill.color}30`,
            backdropFilter: 'blur(20px)',
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{displaySkill.icon}</span>
            <div>
              <h3 className="text-xl font-black" style={{ fontFamily: 'Orbitron, monospace', color: displaySkill.color }}>{displaySkill.name}</h3>
              <span className="text-xs font-mono tracking-widest" style={{ color: `${displaySkill.color}70` }}>{displaySkill.category}</span>
            </div>
          </div>
          <p className="text-sm leading-relaxed mb-4 text-slate-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{displaySkill.desc}</p>

          {displaySkill.projects.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-mono text-slate-600 mb-2 tracking-wider">USED IN</p>
              <div className="flex gap-2 flex-wrap">
                {displaySkill.projects.map(p => (
                  <span key={p} className="text-xs px-2 py-0.5 rounded font-mono" style={{ background: `${displaySkill.color}10`, color: displaySkill.color, border: `1px solid ${displaySkill.color}20` }}>{p}</span>
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="flex justify-between text-xs font-mono mb-1.5">
              <span style={{ color: `${displaySkill.color}70` }}>Proficiency</span>
              <span style={{ color: displaySkill.color }}>{displaySkill.level}%</span>
            </div>
            <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <motion.div
                className="h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${displaySkill.level}%` }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ background: `linear-gradient(90deg, ${displaySkill.color}, ${displaySkill.color}80)`, boxShadow: `0 0 10px ${displaySkill.color}70` }}
              />
            </div>
          </div>

          {clickedSkill && (
            <button
              onClick={onDeselect}
              className="mt-4 text-xs font-mono text-slate-500 hover:text-white transition-colors"
              style={{ cursor: 'pointer' }}
            >
              ← deselect
            </button>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-6 rounded-2xl text-center"
          style={{ background: 'rgba(168,85,247,0.04)', border: '1px solid rgba(168,85,247,0.1)' }}
        >
          <div className="text-4xl mb-3">👆</div>
          <p className="text-sm text-slate-500 font-mono">Tap a skill node to inspect</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}