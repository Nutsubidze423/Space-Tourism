# 🌌 EVENT HORIZON - Award-Winning Space Tourism Website

> An immersive, interactive 3D space experience built with React Three Fiber

![Event Horizon](https://img.shields.io/badge/Status-Live-success)
![React](https://img.shields.io/badge/React-18-blue)
![Three.js](https://img.shields.io/badge/Three.js-Latest-green)

## ✨ Features

### 🎨 Visual Excellence

- **Photorealistic Black Hole** with custom GLSL shaders
- **Dynamic Accretion Disk** with turbulent noise and color gradients
- **8,000+ Star Particle System** with realistic depth
- **Bloom Post-Processing** for ethereal glow effects
- **Glass-morphism UI** with backdrop blur
- **Premium Color Palette** - Deep blacks, cosmic blues, electric accents

### 🎭 Interactive Elements

- **Mouse-Responsive Black Hole** - Disk responds to cursor movement
- **Auto-Rotating Camera** with smooth orbital controls
- **Hover Effects** on all interactive elements
- **Gradient Text Animations** with shimmer effects
- **Magnetic Button Interactions** with glow on hover

### 🚀 Technical Highlights

- **React Three Fiber** for declarative 3D
- **Custom GLSL Shaders** for the accretion disk
- **Procedural Noise** (FBM) for realistic turbulence
- **Additive Blending** for luminous effects
- **60 FPS Performance** with optimized rendering
- **Hot Module Replacement** for instant updates

## 🎯 Current Implementation

### Homepage - Black Hole Spectacle ✅

- ✅ Massive photorealistic black hole
- ✅ Glowing accretion disk (oranges, blues, whites)
- ✅ Smooth rotation animation
- ✅ Particle starfield (8,000 stars)
- ✅ Dynamic lighting with point light at singularity
- ✅ Mouse parallax effect
- ✅ Premium glassmorphism navigation
- ✅ Hero text with gradient animation
- ✅ Interactive CTA buttons with hover effects
- ✅ Bloom post-processing
- ✅ Scroll indicator

### Coming Next 🚧

- [ ] Gravitational lensing shader effect
- [ ] Particle streams into event horizon
- [ ] Scroll-triggered camera zoom
- [ ] Destinations page (Solar System)
- [ ] Spacecraft showcase
- [ ] Crew page
- [ ] Journey timeline
- [ ] Booking system

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Three.js** - 3D rendering engine
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers
- **@react-three/postprocessing** - Post-processing effects
- **GSAP** - Premium animations (planned)
- **Lenis** - Smooth scrolling (planned)

## 🎨 Design System

### Colors

```css
--c-bg: #0a0a0a /* Deep black */ --c-bg-secondary: #1a1f3a /* Cosmic blue */ --c-bg-tertiary: #2d1b4e /* Deep purple */ --c-accent-blue: #00d4ff /* Electric blue */ --c-accent-gold: #ffd700 /* Golden */ --c-accent-green: #00ff88 /* Aurora green */ --c-accent-orange: #ff6600 /* Hot orange */;
```

### Typography

- **Headings**: Syncopate, Orbitron (futuristic, bold)
- **Body**: Inter (clean, readable)

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Visit `http://localhost:5173` to see the experience.

## 📁 Project Structure

```
src/
├── components/
│   ├── canvas/          # 3D components
│   │   ├── BlackHole.tsx
│   │   └── StarField.tsx
│   ├── ui/              # UI components
│   │   ├── Navbar.tsx
│   │   └── HeroText.tsx
│   └── layout/
│       └── SmoothScroll.tsx
├── shaders/
│   └── BlackHoleShader.ts  # Custom GLSL shaders
├── styles/
│   └── tokens.css       # Design tokens
├── App.tsx              # Main app component
└── main.tsx             # Entry point
```

## 🎯 Performance

- **60 FPS** on modern hardware
- **Optimized shaders** with efficient noise functions
- **Frustum culling** for off-screen objects
- **Additive blending** for performance
- **Lazy loading** ready for future assets

## 🌟 Inspiration

This project draws inspiration from:

- SpaceX website aesthetics
- Apple product page interactions
- Awwwards winning sites (bruno-simon.com)
- AAA video game UI quality
- Museum-quality interactive experiences

## 📝 License

MIT

## 🙏 Acknowledgments

- Three.js community
- React Three Fiber team
- Procedural noise techniques from IQ/Shadertoy

---

**Made with ❤️ and a passion for space exploration**

🚀 **Event Horizon** - Where reality bends
