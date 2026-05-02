'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const USERNAME = 'DarshJaipuria';

const TERMINAL_LINES = [
  'booting darsh.dev...',
  'loading neural_networks.py...',
  'git push origin main ✓',
  'training model... accuracy: 94.2%',
  'npm run build → compiled successfully',
  'pushing commits to reality...',
  'evolving systems... [████████░░] 80%',
  'new idea detected → adding to backlog',
  'debugging face_auth.py... fixed ✓',
  'deploying nitro_rush_3d... live ✓',
  'loading creativity modules...',
  'iterating on UI components...',
  'reading research papers at 2am...',
  'git commit -m "make it feel alive"',
  'system status: BUILDING ▮',
];

const STATUS_MESSAGES = [
  'Currently building real-world AI systems',
  'Exploring machine learning + interactive experiences',
  'Learning. Building. Iterating. Shipping.',
  'Turning ideas into systems that feel alive',
  'Obsessed with the intersection of AI + design',
];

function TerminalFeed() {
  const [currentLine, setCurrentLine] = useState('');
  const [charIdx, setCharIdx] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);
  const [displayedLines, setDisplayedLines] = useState([]);
  const termRef = useRef(null);

  useEffect(() => {
    const line = TERMINAL_LINES[lineIdx % TERMINAL_LINES.length];
    if (charIdx < line.length) {
      const t = setTimeout(() => {
        setCurrentLine(p => p + line[charIdx]);
        setCharIdx(p => p + 1);
      }, 35);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setDisplayedLines(p => [...p.slice(-6), line]);
        setCurrentLine('');
        setCharIdx(0);
        setLineIdx(p => p + 1);
      }, 600);
      return () => clearTimeout(t);
    }
  }, [charIdx, lineIdx]);

  useEffect(() => {
    if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight;
  }, [displayedLines, currentLine]);

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: 'rgba(5,5,10,0.95)',
        border: '1px solid rgba(168,85,247,0.2)',
        boxShadow: '0 0 30px rgba(168,85,247,0.06)',
      }}
    >
      <div
        className="flex items-center gap-2 px-4 py-2.5"
        style={{ background: 'rgba(168,85,247,0.06)', borderBottom: '1px solid rgba(168,85,247,0.1)' }}
      >
        {['#ec4899','#a855f7','#3b82f6'].map((c,i) => (
          <div key={i} className="w-3 h-3 rounded-full" style={{ background: c, boxShadow: `0 0 6px ${c}80` }} />
        ))}
        <span className="ml-2 text-xs font-mono text-purple-400/40 tracking-widest">darsh@dev:~$</span>
        <span className="ml-auto text-xs font-mono text-green-400/40 tracking-widest">● LIVE</span>
      </div>
      <div ref={termRef} className="p-4 h-44 overflow-hidden" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
        {displayedLines.map((l, i) => (
          <div key={i} className="flex gap-2 mb-1.5" style={{ opacity: 0.45 + (i / displayedLines.length) * 0.4 }}>
            <span style={{ color: '#a855f7' }}>$</span>
            <span className="text-xs text-green-400/80">{l}</span>
          </div>
        ))}
        <div className="flex gap-2 mb-1.5">
          <span className="text-xs" style={{ color: '#a855f7' }}>$</span>
          <span className="text-xs text-green-300/90">{currentLine}</span>
          <span className="text-xs text-purple-400 blink">▮</span>
        </div>
      </div>
    </div>
  );
}

function LiveStatusPanel() {
  const [msgIdx, setMsgIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setMsgIdx(p => (p + 1) % STATUS_MESSAGES.length);
        setVisible(true);
      }, 400);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="relative p-5 rounded-xl overflow-hidden"
      style={{
        background: 'rgba(168,85,247,0.04)',
        border: '1px solid rgba(168,85,247,0.2)',
        boxShadow: '0 0 40px rgba(168,85,247,0.06)',
      }}
    >
      <div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(168,85,247,0.08), transparent 60%)' }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #a855f7, #3b82f6, transparent)' }}
      />
      <div className="flex items-center gap-2 mb-3">
        <div
          className="w-2 h-2 rounded-full bg-green-400"
          style={{ boxShadow: '0 0 8px rgba(74,222,128,0.8)', animation: 'pulse 2s infinite' }}
        />
        <span className="text-xs font-mono tracking-widest text-green-400/70">LIVE STATUS</span>
      </div>
      <div className="h-10 flex items-center">
        <p
          className="text-base font-bold"
          style={{
            fontFamily: 'Rajdhani, sans-serif',
            background: 'linear-gradient(135deg, #a855f7, #3b82f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(6px)',
            transition: 'opacity 0.4s, transform 0.4s',
          }}
        >
          {STATUS_MESSAGES[msgIdx]}
        </p>
      </div>
    </div>
  );
}

function RepoCard({ repo, index }) {
  const ref = useRef(null);
  const cardRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const langColor = {
    Python: '#3b82f6', JavaScript: '#eab308',
    HTML: '#f97316', CSS: '#a855f7', TypeScript: '#06b6d4',
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16,1,0.3,1] }}
    >
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ cursor: 'none', display: 'block' }}
      >
        <div
          ref={cardRef}
          onMouseMove={(e) => {
            const rect = cardRef.current.getBoundingClientRect();
            setTilt({
              x: ((e.clientY - rect.top) / rect.height - 0.5) * 14,
              y: -((e.clientX - rect.left) / rect.width - 0.5) * 14,
            });
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
          className="relative p-5 rounded-xl overflow-hidden group"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: `1px solid ${hovered ? 'rgba(168,85,247,0.35)' : 'rgba(168,85,247,0.1)'}`,
            transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${hovered ? 'translateZ(6px)' : ''}`,
            transition: hovered ? 'transform 0.05s, border 0.3s, box-shadow 0.3s' : 'transform 0.5s ease, border 0.3s, box-shadow 0.3s',
            boxShadow: hovered ? '0 20px 40px rgba(168,85,247,0.12)' : 'none',
          }}
        >
          {hovered && (
            <div
              className="absolute inset-0 pointer-events-none rounded-xl"
              style={{ background: 'radial-gradient(ellipse at 60% 0%, rgba(168,85,247,0.08), transparent 70%)' }}
            />
          )}
          <div className="flex items-start justify-between gap-2 mb-2 relative">
            <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors" style={{ fontFamily: 'Orbitron, monospace' }}>
              {repo.name}
            </h4>
            <div className="flex items-center gap-1 text-yellow-400 flex-shrink-0">
              <span className="text-xs">⭐</span>
              <span className="text-xs font-mono">{repo.stargazers_count}</span>
            </div>
          </div>
          {repo.description && (
            <p className="text-xs text-slate-500 mb-3 line-clamp-2 leading-relaxed relative" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              {repo.description}
            </p>
          )}
          <div className="flex items-center justify-between relative">
            {repo.language && (
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ background: langColor[repo.language] || '#94a3b8' }} />
                <span className="text-xs font-mono text-slate-500">{repo.language}</span>
              </div>
            )}
            <span className="text-xs font-mono text-slate-600">
              {new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </span>
          </div>
        </div>
      </a>
    </motion.div>
  );
}

export default function GitHubStats() {
  const [repos, setRepos] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' });

  useEffect(() => {
    Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`).then(r => r.json()),
      fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=6`).then(r => r.json()),
    ]).then(([user, repoData]) => {
      setProfile(user);
      setRepos(Array.isArray(repoData) ? repoData.filter(r => !r.fork).slice(0, 6) : []);
    }).catch(() => setRepos([])).finally(() => setLoading(false));
  }, []);

  return (
    <section
      id="github"
      className="relative py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050505 0%, #04080f 50%, #050505 100%)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(59,130,246,0.04), transparent 70%)' }}
      />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div ref={titleRef} className="mb-14">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={titleInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
            <span className="text-xs font-mono tracking-[0.5em] text-purple-400/50 block mb-4">04 // BUILDING IN PUBLIC</span>
            <h2
              className="mb-4"
              style={{
                fontFamily: 'Orbitron, monospace', fontWeight: 900,
                fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1,
                background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}
            >
              LIVE ACTIVITY
            </h2>
            <p className="text-lg max-w-xl" style={{ color: 'rgba(226,232,240,0.5)', fontFamily: 'Rajdhani, sans-serif' }}>
              Not waiting for the right time. Building now, learning always.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left col */}
          <div className="flex flex-col gap-5">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <LiveStatusPanel />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}>
              <TerminalFeed />
            </motion.div>
            {profile && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="flex items-center gap-4 p-4 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(168,85,247,0.1)' }}
              >
                <img src={profile.avatar_url} alt="avatar" className="w-12 h-12 rounded-full flex-shrink-0" style={{ border: '2px solid rgba(168,85,247,0.4)' }} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-white" style={{ fontFamily: 'Orbitron, monospace' }}>{profile.name || USERNAME}</div>
                  <div className="text-xs font-mono text-purple-400/50">@{USERNAME}</div>
                </div>
                <div className="flex gap-5 text-center">
                  {[{ val: profile.public_repos, lbl: 'Repos' }, { val: profile.followers, lbl: 'Followers' }].map(({ val, lbl }) => (
                    <div key={lbl}>
                      <div className="text-lg font-black text-purple-400" style={{ fontFamily: 'Orbitron, monospace' }}>{val}</div>
                      <div className="text-xs font-mono text-slate-600">{lbl}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right col */}
          <div>
            <h3 className="text-xs font-mono tracking-widest text-purple-400/50 mb-4">RECENT REPOSITORIES</h3>
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <div className="w-8 h-8 rounded-full border-2 border-t-blue-500 border-blue-500/20" style={{ animation: 'spin 0.8s linear infinite' }} />
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {repos.map((repo, i) => <RepoCard key={repo.id} repo={repo} index={i} />)}
                {repos.length === 0 && <p className="text-sm text-slate-600 font-mono">Could not load repos.</p>}
              </div>
            )}
            <motion.div className="mt-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <a
                href={`https://github.com/${USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono text-purple-400/50 hover:text-purple-300 transition-colors tracking-widest"
                style={{ cursor: 'none' }}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                VIEW ALL REPOSITORIES →
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
