'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const [state, setState] = useState('default'); // default | hover | text | button

  // pointer-events none is set inline; layout controls cursor: none via body.custom-cursor

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };

      const targets = document.querySelectorAll('button, a, [data-magnetic]');
      targets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 60) {
          pos.current = {
            x: e.clientX - dx * 0.18,
            y: e.clientY - dy * 0.18,
          };
        }
      });
    };

    const onEnterBtn = () => setState('button');
    const onEnterText = () => setState('text');
    const onLeave = () => setState('default');

    const attachListeners = () => {
      document.querySelectorAll('button, a').forEach(el => {
        el.addEventListener('mouseenter', onEnterBtn);
        el.addEventListener('mouseleave', onLeave);
      });
      document.querySelectorAll('p, h1, h2, h3, h4, span').forEach(el => {
        el.addEventListener('mouseenter', onEnterText);
        el.addEventListener('mouseleave', onLeave);
      });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    attachListeners();

    const obs = new MutationObserver(attachListeners);
    obs.observe(document.body, { childList: true, subtree: true });

    let rafId;
    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 5}px, ${pos.current.y - 5}px)`;
      }
      ring.current.x += (pos.current.x - ring.current.x) * 0.1;
      ring.current.y += (pos.current.y - ring.current.y) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px)`;
      }
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
      obs.disconnect();
    };
  }, []);

  const colors = {
    default: { dot: '#a855f7', ring: 'rgba(168,85,247,0.6)', glow: 'rgba(168,85,247,0.9)' },
    button:  { dot: '#ec4899', ring: 'rgba(236,72,153,0.7)', glow: 'rgba(236,72,153,0.9)' },
    text:    { dot: '#3b82f6', ring: 'rgba(59,130,246,0.5)',  glow: 'rgba(59,130,246,0.7)' },
  };
  const c = colors[state] || colors.default;

  const ringSize = state === 'button' ? 44 : state === 'text' ? 24 : 40;
  const dotSize  = state === 'text' ? 3 : 10;

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          position: 'fixed', zIndex: 99999, pointerEvents: 'none',
          width: `${dotSize}px`, height: `${dotSize}px`,
          borderRadius: '50%', background: c.dot,
          boxShadow: `0 0 12px ${c.glow}, 0 0 24px ${c.glow}50`,
          mixBlendMode: 'screen',
          transition: 'width 0.2s, height 0.2s, background 0.2s, box-shadow 0.2s',
        }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          position: 'fixed', zIndex: 99998, pointerEvents: 'none',
          width: `${ringSize}px`, height: `${ringSize}px`,
          borderRadius: '50%', background: 'transparent',
          border: `1.5px solid ${c.ring}`,
          boxShadow: `0 0 10px ${c.ring}40`,
          transition: 'width 0.25s, height 0.25s, border-color 0.25s',
        }}
      />
    </>
  );
}