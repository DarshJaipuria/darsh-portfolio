'use client';

import { useState } from "react";
import { useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const TIMELINE = [
  {
    year: '2016',
    phase: 'GENESIS',
    title: 'The Spark',
    subtitle: 'Class 2 — Scratch',
    description:
      'It started with a simple drag-and-drop interface called Scratch. Block coding felt like magic — I was building games before I knew what a variable was. That curiosity never left.',
    color: '#a855f7',
    icon: '⚡',
    tag: 'Block Coding',
  },
  {
    year: '2017–2019',
    phase: 'EARLY CODE',
    title: 'First Real Language',
    subtitle: 'Class 3–5 — QBASIC',
    description:
      'QBASIC opened the door to real programming logic. I wasn\'t just dragging blocks anymore — I was writing actual code, building projects, understanding how computers think.',
    color: '#3b82f6',
    icon: '🧠',
    tag: 'QBASIC',
  },
  {
    year: '2020–2022',
    phase: 'EXPANSION',
    title: 'Breaking the Walls',
    subtitle: 'Class 6–8 — HTML & Beyond',
    description:
      'School wasn\'t enough. I dove deep into HTML, exploring online courses, building web pages — learning beyond the curriculum because curiosity had no off switch.',
    color: '#06b6d4',
    icon: '🌐',
    tag: 'HTML • CSS',
  },
  {
    year: '2022',
    phase: 'SELECTION',
    title: 'Choosing My Weapon',
    subtitle: 'Class 8 — Python vs Java',
    description:
      'Two paths: Python or Java. I chose Python — not randomly, but strategically. It aligned perfectly with where the future was heading: AI, data science, automation.',
    color: '#ec4899',
    icon: '🐍',
    tag: 'Python • Java',
  },
  {
    year: '2023',
    phase: 'FOUNDATION',
    title: 'Building the Core',
    subtitle: 'Class 9 — Python Mastery',
    description:
      'Dedicated a full year to Python fundamentals. Not just syntax — algorithms, data structures, problem-solving patterns. Building the mental model that everything else would stand on.',
    color: '#10b981',
    icon: '🏗️',
    tag: 'Core Python',
  },
  {
    year: '2024',
    phase: 'RESISTANCE',
    title: 'Against the Current',
    subtitle: 'Class 10 — The Fight',
    description:
      '"Focus only on studies." Everyone said it. Board exam pressure was real. I kept building anyway — because stopping felt more wrong than anything else.',
    color: '#f59e0b',
    icon: '🔥',
    tag: 'Persistence',
  },
  {
    year: '2025',
    phase: 'LAUNCH',
    title: 'Projects Go Live',
    subtitle: 'Class 11 — Building for Real',
    description:
      'Started shipping real projects: Hand Cricket, Face Auth System, Nitro Rush 3D. Not tutorials. Not clones. Original ideas turned into working software.',
    color: '#ec4899',
    icon: '⚙️',
    tag: 'Real Projects',
  },
  {
    year: '2026',
    phase: 'NOW',
    title: 'The Present',
    subtitle: 'AI • Data Science • Systems',
    description:
      'Fully focused on AI, Data Science, and building real-world systems that matter. The spark from 2017 never died — it just grew into something much bigger.',
    color: '#a855f7',
    icon: '🚀',
    tag: 'AI • Data Science',
  },
];

function TimelineCard({ item, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-80px' });
  const isEven = index % 2 === 0;
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className={`relative flex items-start gap-8 mb-12 ${isEven ? 'flex-row' : 'flex-row-reverse'} max-w-4xl mx-auto`}
    >
      {/* Card */}
      <motion.div
        className={`flex-1 ${isEven ? 'text-right' : 'text-left'}`}
        initial={{ opacity: 0, x: isEven ? -60 : 60, rotate: isEven ? -3 : 3 }}
        animate={isInView
          ? { opacity: 1, x: 0, rotate: 0 }
          : { opacity: 0, x: isEven ? -60 : 60, rotate: isEven ? -3 : 3 }
        }
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className="relative p-6 rounded-2xl transition-all duration-500"
          style={{
            background: hovered
              ? `radial-gradient(ellipse at center, ${item.color}08, rgba(10,10,20,0.9))`
              : 'rgba(255,255,255,0.02)',
            border: `1px solid ${hovered ? item.color + '45' : item.color + '18'}`,
            boxShadow: hovered ? `0 0 40px ${item.color}15, 0 20px 40px rgba(0,0,0,0.4)` : 'none',
            transform: hovered ? 'translateY(-4px)' : 'none',
          }}
        >
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-4 h-4" style={{ borderTop: `2px solid ${item.color}60`, borderLeft: `2px solid ${item.color}60` }} />
          <div className="absolute bottom-0 right-0 w-4 h-4" style={{ borderBottom: `2px solid ${item.color}60`, borderRight: `2px solid ${item.color}60` }} />

          <div className={`flex mb-3 ${isEven ? 'justify-end' : 'justify-start'}`}>
            <span className="text-xs font-mono tracking-[0.3em] px-3 py-1 rounded-full" style={{ background: `${item.color}18`, color: item.color, border: `1px solid ${item.color}30` }}>
              {item.phase}
            </span>
          </div>

          <div className="text-5xl font-black mb-1" style={{ fontFamily: 'Orbitron, monospace', color: `${item.color}20`, lineHeight: 1 }}>
            {item.year}
          </div>

          <h3 className="text-xl font-bold mb-1 transition-colors" style={{ fontFamily: 'Orbitron, monospace', color: hovered ? item.color : `${item.color}cc` }}>
            {item.title}
          </h3>
          <p className="text-sm font-mono mb-3" style={{ color: 'rgba(168,85,247,0.5)' }}>{item.subtitle}</p>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(226,232,240,0.6)', fontFamily: 'Rajdhani, sans-serif', fontSize: '0.9rem' }}>
            {item.description}
          </p>

          <div className={`flex mt-4 ${isEven ? 'justify-end' : 'justify-start'}`}>
            <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: `${item.color}12`, color: `${item.color}80` }}>
              {item.tag}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Center node */}
      <motion.div
        className="relative flex-shrink-0 flex flex-col items-center z-10"
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.2, type: 'spring', stiffness: 250, damping: 22 }}
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-2xl relative"
          style={{
            background: `radial-gradient(circle, ${item.color}25, ${item.color}08)`,
            border: `2px solid ${item.color}60`,
            boxShadow: isInView ? `0 0 24px ${item.color}40` : 'none',
            transition: 'box-shadow 1s',
          }}
        >
          {item.icon}
        </div>
        {/* Pulse ring — triggers when in view */}
        {isInView && (
          <div
            className="absolute w-14 h-14 rounded-full"
            style={{
              border: `1px solid ${item.color}40`,
              animation: 'nodeRing 2s ease-out infinite',
            }}
          />
        )}
      </motion.div>

      <div className="flex-1" />
    </div>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: false, margin: '-80px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const lineHeight = useTransform(scrollYProgress, [0.05, 0.95], ['0%', '100%']);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050505 0%, #0a0510 50%, #050505 100%)' }}
    >
      <style>{`
        @keyframes nodeRing {
          0%   { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>

      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(168,85,247,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(168,85,247,0.05), transparent 70%)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div ref={titleRef} className="text-center mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={titleInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <span className="text-xs font-mono tracking-[0.5em] text-purple-400/50 block mb-4">01 // ORIGIN STORY</span>
            <h2
              className="mb-4"
              style={{
                fontFamily: 'Orbitron, monospace', fontWeight: 900,
                fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1,
                background: 'linear-gradient(135deg, #a855f7, #3b82f6, #ec4899)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}
            >
              MY JOURNEY
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: 'rgba(226,232,240,0.5)', fontFamily: 'Rajdhani, sans-serif' }}>
              From dragging blocks in Scratch to architecting AI systems — the story of obsession turning into craft.
            </p>
          </motion.div>
        </div>

        {/* Desktop timeline */}
        <div className="relative hidden md:block">
          {/* Static background line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: 'rgba(168,85,247,0.08)' }}
          />
          {/* Animated scroll-fill line */}
          <div
            className="absolute left-1/2 top-0 w-px -translate-x-1/2 origin-top overflow-hidden"
            style={{ height: '100%' }}
          >
            <motion.div
              className="w-full"
              style={{
                height: lineHeight,
                background: 'linear-gradient(180deg, transparent, #a855f7 10%, #3b82f6 50%, #ec4899 90%, transparent)',
                boxShadow: '0 0 8px rgba(168,85,247,0.6)',
              }}
            />
          </div>

          {TIMELINE.map((item, i) => (
            <TimelineCard key={item.year + i} item={item} index={i} />
          ))}
        </div>

        {/* Mobile single-column */}
        <div className="md:hidden space-y-8">
          {TIMELINE.map((item, i) => {
            const ref = useRef(null);
            const inView = useInView(ref, { once: true, margin: '-60px' });
            return (
              <motion.div
                key={item.year + i}
                ref={ref}
                initial={{ opacity: 0, y: 40, rotate: -2 }}
                animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="relative pl-8"
              >
                <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{ background: `linear-gradient(180deg, ${item.color}, transparent)` }} />
                <div className="absolute left-[-5px] top-5 w-3 h-3 rounded-full" style={{ background: item.color, boxShadow: `0 0 10px ${item.color}` }} />
                <div className="p-5 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${item.color}20` }}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-xs font-mono tracking-widest" style={{ color: item.color }}>{item.year} — {item.phase}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-1" style={{ fontFamily: 'Orbitron, monospace', color: item.color }}>{item.title}</h3>
                  <p className="text-xs font-mono mb-2 text-purple-400/50">{item.subtitle}</p>
                  <p className="text-sm leading-relaxed text-slate-400">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block p-6 rounded-2xl" style={{ background: 'rgba(168,85,247,0.05)', border: '1px solid rgba(168,85,247,0.15)', backdropFilter: 'blur(20px)' }}>
            <p className="text-lg font-bold mb-1" style={{ fontFamily: 'Orbitron, monospace', color: '#a855f7' }}>The journey continues.</p>
            <p className="text-sm text-slate-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>Every project adds a new chapter.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}