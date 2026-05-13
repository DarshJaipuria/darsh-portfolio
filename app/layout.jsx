'use client';

import './globals.css';
import { useState, useEffect } from 'react';
import CustomCursor from '../components/CustomCursor';
import { Analytics } from '@vercel/analytics/next';

export default function RootLayout({ children }) {
  const [cursorEnabled, setCursorEnabled] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('cursor');
    if (saved !== null) setCursorEnabled(saved === 'true');

    const onStorage = (e) => {
      if (e.key === 'cursor') setCursorEnabled(e.newValue === 'true');
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    localStorage.setItem('cursor', cursorEnabled);
    if (cursorEnabled) {
      document.body.classList.add('custom-cursor');
    } else {
      document.body.classList.remove('custom-cursor');
    }
  }, [cursorEnabled]);

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&family=Share+Tech+Mono&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#050505" />
      </head>
      <body className="antialiased overflow-x-hidden">
        {cursorEnabled && <CustomCursor />}
        {children}
        <Analytics />
      </body>
    </html>
  );
}