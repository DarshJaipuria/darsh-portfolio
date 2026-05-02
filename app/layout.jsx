import './globals.css';

export const metadata = {
  title: 'Darsh Jaipuria — Digital Architect',
  description: 'I build things that feel alive. Portfolio of Darsh Jaipuria — AI, Data Science, and Interactive Experiences.',
  keywords: ['Darsh Jaipuria', 'portfolio', 'developer', 'AI', 'Python', 'Three.js'],
  openGraph: {
    title: 'Darsh Jaipuria — Digital Architect',
    description: 'I build things that feel alive.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
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
        {children}
      </body>
    </html>
  );
}
