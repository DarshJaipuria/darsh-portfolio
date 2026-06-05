'use client';

import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const certificates = [
  {
    title: "Databases and SQL for Data Science with Python",
    issuer: "IBM (Coursera)",
    date: "June 2026",
    image: "/certs/ibm-database-for-py.jpg",
    learnings: [
      "Analyzed data within databases using SQL and Python",
      "Created relational databases and managed multiple tables",
      "Constructed SQL queries using DDL and DML commands",
      "Worked with joins, views, transactions, and stored procedures",
      "Applied SQL techniques for data analysis and database management",
    ],
  },
  {
    title: "Python Project for Data Science",
    issuer: "IBM (Coursera)",
    date: "May 2026",
    image: "/certs/ibm-pyproj_ds.jpg",
    learnings: [
      "Applied Python for real-world Data Science and Data Analysis projects",
      "Worked with Pandas for data manipulation and analysis",
      "Built dashboards and visualizations using Python libraries",
      "Performed web scraping and data collection using BeautifulSoup",
      "Used Jupyter Notebook for project development and workflows",
    ],
  },
  {
    title: "Python for Data Science, AI & Development",
    issuer: "IBM (Coursera)",
    date: "May 2026",
    image: "/certs/ibm-python-for-ds.jpg",
    learnings: [
      "Core Python programming — data types, structures, loops & functions",
      "Working with libraries like Pandas and NumPy for data analysis",
      "Using APIs and web scraping to collect real-world data",
      "Writing and running code directly in Jupyter Notebooks",
    ],
  },
  {
    title: "Data Science Methodology",
    issuer: "IBM (Coursera)",
    date: "May 2026",
    image: "/certs/ibm-data-methodology.jpg",
    learnings: [
      "CRISP-DM methodology for structuring data science projects",
      "Forming and refining analytical questions from business problems",
      "Data collection strategies and source evaluation",
      "Iterative model development and feedback loops",
      "Storytelling with data to communicate findings",
    ],
  },
  {
    title: "Tools for Data Science",
    issuer: "IBM (Coursera)",
    date: "April 2026",
    image: "/certs/ibm-tools-data-science.jpg",
    learnings: [
      "Jupyter Notebooks and JupyterLab for interactive computing",
      "RStudio and the R ecosystem for statistical analysis",
      "IBM Watson Studio and cloud-based data tools",
      "Git & GitHub for version control in data projects",
      "Python, R, and Scala for data science workflows",
    ],
  },
  {
    title: "What is Data Science",
    issuer: "IBM (Coursera)",
    date: "April 2026",
    image: "/certs/ibm-what-is-data-science.jpg",
    learnings: [
      "Core concepts and scope of modern data science",
      "Role of a data scientist and real-world applications",
      "Big data, machine learning, and deep learning fundamentals",
      "Data science use cases across industries",
      "How data-driven decisions impact business strategy",
    ],
  },
  {
    title: "Introduction to Data Science and AI",
    issuer: "IIT Madras School Connect",
    date: "2025",
    image: "/certs/iitm-school-connect.jpg",
    learnings: [
      "Foundations of artificial intelligence and machine learning",
      "Supervised and unsupervised learning concepts",
      "Data preprocessing and feature engineering",
      "Neural networks and deep learning basics",
      "Real-world AI applications and ethical considerations",
    ],
  },
  {
    title: "Generative AI Mastermind",
    issuer: "Outskill",
    date: "2025",
    image: "/certs/outskill-genai.jpg",
    learnings: [
      "Large language models (LLMs) and how they work",
      "Prompt engineering techniques for optimal outputs",
      "Building AI-powered workflows and automation",
      "Image generation with diffusion models",
      "Practical GenAI applications in products and business",
    ],
  },
];

export default function CertificatesPage() {
  const router = useRouter();
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') setSelected(null); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  return (
    <div style={{ background: '#050505', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'Rajdhani, sans-serif', overflowX: 'hidden' }}>

      <div className="fixed inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(rgba(168,85,247,0.8) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">

        {/* Header */}
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="text-xs font-mono tracking-[0.5em] text-purple-400/50 block mb-4">ACHIEVEMENTS // VERIFIED</span>
          <h1
            className="font-black mb-4 leading-none"
            style={{
              fontFamily: 'Orbitron, monospace',
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              background: 'linear-gradient(135deg, #a855f7, #3b82f6, #ec4899)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}
          >
            CERTIFICATES
          </h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'rgba(226,232,240,0.45)' }}>
            Proof of continuous learning and skill development
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              onClick={() => setSelected(cert)}
              className="rounded-xl overflow-hidden group"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(168,85,247,0.15)',
                transition: 'border-color 0.3s, box-shadow 0.3s',
                cursor: 'none',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(168,85,247,0.5)';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(168,85,247,0.12)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(168,85,247,0.15)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="overflow-hidden" style={{ aspectRatio: '16/10' }}>
                <img src={cert.image} alt={cert.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <h3 className="font-black text-white leading-snug mb-2" style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.8rem' }}>{cert.title}</h3>
                <p className="text-xs font-mono mb-1" style={{ color: '#a855f7' }}>{cert.issuer}</p>
                <p className="text-xs font-mono mb-3" style={{ color: 'rgba(226,232,240,0.3)' }}>{cert.date}</p>
                <p className="text-xs font-mono" style={{ color: 'rgba(168,85,247,0.45)' }}>Click to expand →</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Back */}
        <motion.div className="text-center mt-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <button
            onClick={() => router.push('/')}
            className="btn-cyber px-8 py-3 text-sm rounded-none"
            style={{ cursor: 'none', fontFamily: 'Orbitron, monospace' }}
          >
            ← BACK TO HOME
          </button>
        </motion.div>
      </div>

      {/* ── MODAL ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            {/* Backdrop blur */}
            <motion.div
              className="absolute inset-0"
              initial={{ backdropFilter: 'blur(0px)' }}
              animate={{ backdropFilter: 'blur(24px)' }}
              exit={{ backdropFilter: 'blur(0px)' }}
              style={{ background: 'rgba(5,5,5,0.9)' }}
            />

            <motion.div
              className="relative z-10 w-full rounded-2xl overflow-hidden flex flex-col md:flex-row"
              style={{
                maxWidth: '960px',
                maxHeight: '88vh',
                background: '#0a0a14',
                border: '1px solid rgba(168,85,247,0.25)',
                boxShadow: '0 0 80px rgba(168,85,247,0.1)',
              }}
              initial={{ scale: 0.88, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-0.5 z-10" style={{ background: 'linear-gradient(90deg, transparent, #a855f7, #3b82f6, transparent)' }} />

              {/* Close button */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-colors text-sm"
                style={{ background: 'rgba(255,255,255,0.07)', cursor: 'none' }}
              >✕</button>

              {/* LEFT — zoomed certificate */}
              <div
                className="md:w-[55%] flex-shrink-0 flex items-center justify-center overflow-hidden"
                style={{ background: '#06060f', minHeight: '260px' }}
              >
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="w-full h-full object-contain"
                  style={{ maxHeight: '88vh' }}
                />
              </div>

              {/* RIGHT — details */}
              <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6">

                {/* Title */}
                <div>
                  <span className="text-xs font-mono tracking-[0.4em] text-purple-400/40 block mb-2">CERTIFICATE OF COMPLETION</span>
                  <h2 className="font-black text-white leading-tight" style={{ fontFamily: 'Orbitron, monospace', fontSize: 'clamp(0.95rem, 2vw, 1.3rem)' }}>
                    {selected.title}
                  </h2>
                </div>

                {/* Issued by + Date */}
                <div className="flex flex-col gap-3">
                  <div className="rounded-lg p-4" style={{ background: 'rgba(168,85,247,0.06)', border: '1px solid rgba(168,85,247,0.14)' }}>
                    <p className="text-xs font-mono tracking-widest mb-1" style={{ color: 'rgba(168,85,247,0.5)' }}>ISSUED BY</p>
                    <p className="font-bold text-white text-base">{selected.issuer}</p>
                  </div>
                  <div className="rounded-lg p-4" style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.14)' }}>
                    <p className="text-xs font-mono tracking-widest mb-1" style={{ color: 'rgba(59,130,246,0.5)' }}>DATE OF ISSUE</p>
                    <p className="font-bold text-white text-base">{selected.date}</p>
                  </div>
                </div>

                {/* Learnings */}
                <div>
                  <p className="text-xs font-mono tracking-[0.4em] mb-4" style={{ color: 'rgba(168,85,247,0.45)' }}>WHAT I LEARNED</p>
                  <ul className="flex flex-col gap-3">
                    {selected.learnings.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: 14 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.12 + i * 0.07 }}
                        className="flex items-start gap-3 text-sm leading-relaxed"
                        style={{ color: 'rgba(226,232,240,0.6)', fontFamily: 'Rajdhani, sans-serif' }}
                      >
                        <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full" style={{ background: '#a855f7', boxShadow: '0 0 6px #a855f7' }} />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}