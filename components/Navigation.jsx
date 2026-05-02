'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'GitHub', href: '#github' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[999] px-6 py-4 flex items-center justify-between"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        style={{
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          background: scrolled ? 'rgba(5,5,5,0.85)' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(168,85,247,0.1)' : 'none',
          transition: 'background 0.4s, backdrop-filter 0.4s, border 0.4s',
        }}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-2 group"
          style={{ cursor: 'none' }}
        >
          <div
            className="w-8 h-8 rounded flex items-center justify-center text-sm font-black"
            style={{
              background: 'linear-gradient(135deg, #a855f7, #3b82f6)',
              fontFamily: 'Orbitron, monospace',
              boxShadow: '0 0 12px rgba(168,85,247,0.5)',
            }}
          >
            D
          </div>
          <span
            className="text-sm font-bold tracking-[0.2em] text-white/80 group-hover:text-white transition-colors"
            style={{ fontFamily: 'Orbitron, monospace' }}
          >
            DARSH
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNav(item.href)}
              className="relative text-sm font-medium tracking-widest text-white/50 hover:text-white transition-colors group"
              style={{ fontFamily: 'Rajdhani, sans-serif', cursor: 'none' }}
            >
              <span className="relative z-10">{item.label.toUpperCase()}</span>
              <span
                className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                style={{ background: 'linear-gradient(90deg, #a855f7, #3b82f6)' }}
              />
            </button>
          ))}

          <button
            onClick={() => router.push('/about')}
            className="btn-cyber text-xs py-2 px-4"
            style={{ cursor: 'none', fontFamily: 'Orbitron, monospace', borderColor: 'rgba(236,72,153,0.6)', color: '#ec4899' }}
          >
            Know Me & CV
          </button>

          <a
            href="mailto:darshjaipuria@gmail.com"
            className="btn-cyber text-xs py-2 px-4"
            style={{ cursor: 'none', fontFamily: 'Orbitron, monospace' }}
          >
            Hire Me
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen((p) => !p)}
          style={{ cursor: 'none' }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block h-px w-6 transition-all duration-300"
              style={{
                background: menuOpen ? '#a855f7' : '#e2e8f0',
                transform: menuOpen
                  ? i === 0 ? 'rotate(45deg) translate(4px, 4px)'
                    : i === 2 ? 'rotate(-45deg) translate(4px, -4px)'
                    : 'scaleX(0)'
                  : 'none',
              }}
            />
          ))}
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[998] flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background: 'rgba(5,5,5,0.97)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item.label}
                onClick={() => handleNav(item.href)}
                className="text-3xl font-black tracking-widest gradient-text"
                style={{ fontFamily: 'Orbitron, monospace', cursor: 'none' }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                {item.label.toUpperCase()}
              </motion.button>
            ))}
            <motion.button
              onClick={() => { setMenuOpen(false); router.push('/about'); }}
              className="text-3xl font-black tracking-widest"
              style={{ fontFamily: 'Orbitron, monospace', cursor: 'none', color: '#ec4899' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: NAV_ITEMS.length * 0.07 }}
            >
              KNOW ME & CV
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}