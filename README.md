# ⚡ DARSH JAIPURIA — Portfolio

A futuristic, interactive, animated digital identity built with Next.js, Framer Motion, Three.js, and GSAP.

---

## 🧰 Tech Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** — utility-first styling
- **Framer Motion** — scroll animations, transitions, micro-interactions
- **Three.js** — 3D particle field in hero
- **Lenis** — buttery smooth scrolling
- **GitHub REST API** — live stats fetching

---

## 📁 Project Structure

```
/app
  layout.jsx         # Root layout + fonts + metadata
  page.jsx           # Main page orchestrating all sections
  globals.css        # Design system: tokens, utilities, animations

/components
  Loader.jsx         # Cyberpunk terminal boot animation
  CustomCursor.jsx   # Glow cursor with lagged ring
  Navigation.jsx     # Blur navbar + mobile menu
  Hero.jsx           # Three.js particles, glitch text, parallax
  About.jsx          # Animated split timeline
  Projects.jsx       # 3D tilt cards, modal overlay
  Skills.jsx         # Orbit visualization + bar fallback
  GitHubStats.jsx    # Live GitHub API stats + repo grid
  Contact.jsx        # Glass card + mailto CTA
```

---

## 🚀 Local Setup

```bash
# 1. Clone / unzip the project
cd darsh-portfolio

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev

# 4. Open http://localhost:3000
```

---

## 📦 Production Build

```bash
npm run build
npm start
```

---

## ☁️ Deploy to Vercel (Recommended)

### Option A — Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Inside project folder
vercel

# Follow prompts:
# - Framework: Next.js ✓ (auto-detected)
# - Build command: next build
# - Output directory: .next
```

### Option B — Vercel Dashboard

1. Push project to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import GitHub repo
4. Vercel auto-detects Next.js — click **Deploy**
5. Done. Live in ~90 seconds.

---

## 🎨 Customization Cheatsheet

| What to change | File | Key variable |
|---|---|---|
| Name / tagline | `Hero.jsx` | `DARSH`, tagline text |
| Social links | `Hero.jsx`, `Contact.jsx` | href values |
| Timeline story | `About.jsx` | `TIMELINE` array |
| Projects | `Projects.jsx` | `PROJECTS` array |
| Skills | `Skills.jsx` | `SKILLS` array |
| GitHub username | `GitHubStats.jsx` | `USERNAME` constant |
| Email | `Contact.jsx` | `EMAIL` constant |
| Color palette | `globals.css` | CSS variables |

---

## ⚡ Performance Notes

- Three.js canvas lazy-initialized client-side
- Lenis smooth scroll initialized after loader completes
- All heavy animations use GPU-friendly `transform` and `opacity`
- Images from GitHub API lazy loaded
- `useInView` from Framer Motion gates all scroll animations

---

## 🌐 Live Features

- **Three.js particle field** — 2000 color particles, mouse-reactive
- **Custom cursor** — dot + lagged ring, color shifts on hover
- **Cyberpunk loader** — terminal typewriter boot sequence
- **Glitch text** — random interval glitch on hero name
- **Timeline** — split alternating cards with scroll reveal
- **3D tilt cards** — real perspective transform on mouse move
- **Orbit skill system** — rotating nodes with live highlight panel
- **Live GitHub stats** — repos, followers, streak card, recent repos
- **Glass contact card** — corner accents, shimmer button

---

Built by Darsh Jaipuria 🚀
