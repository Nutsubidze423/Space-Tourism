# AGENTS.md

This document provides essential information for agentic coding agents working on this React/TypeScript space tourism website.

## Build Commands

### Development Server
```bash
npm run dev
```
Starts the development server with hot reloading on port 3000.

### Production Build
```bash
npm run build
```
Compiles TypeScript and creates optimized production build in `dist/` directory.

### Preview Production Build
```bash
npm run preview
```
Locally preview the production build.

### Linting
```bash
npm run lint
```
Run ESLint on all TypeScript and TSX files with strict rules.

## Testing Commands

### Unit Tests
```bash
# Currently no unit tests configured
```

### Running a Single Test
Currently no test files exist. If you create tests, use:
```bash
# Example command would be:
# npm test -- --testNamePattern="specific test name"
```

## Code Style Guidelines

### General Principles
Follow the premium, award-winning design standards as described in the project requirements:
- Use glass-morphism UI components with frosted glass effects
- Implement 3D graphics with Three.js for all interactive elements
- Apply GSAP for smooth animations and transitions
- Maintain dark luxury theme with cosmic blues and electric accents

### Language Preferences
- Primary language: TypeScript (strict mode enabled)
- Framework: React with functional components and hooks
- 3D Library: Three.js
- Animation Library: GSAP
- Routing: React Router DOM

### File Organization
- Components: `/src/components/`
- Pages: `/src/pages/`
- Styles: CSS files colocated with components
- Hooks: `/src/hooks/`
- Assets: `/public/` or `/src/assets/`

### Imports
1. External libraries first (react, gsap, three, etc.)
2. Internal components and utilities
3. CSS imports last
4. Separate groups with blank lines
5. Use absolute imports when possible
6. Destructure named exports directly in import statements

Example:
```typescript
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

import Header from '../components/Header/Header';
import CustomCursor from '../components/CustomCursor/CustomCursor';

import './Home.css';
```

### Component Structure
1. Type definitions (interfaces/types)
2. Imports
3. Functional component declaration
4. Hook declarations
5. Event handlers
6. Return statement with JSX
7. Export statement

### Component Naming Conventions
- PascalCase for component names
- Descriptive names that reflect UI purpose (GlassCard, Planet3D, SpaceJourney)
- CSS modules or colocated CSS files with same name as component

### TypeScript Guidelines
1. Use strict mode (enforced in tsconfig.json)
2. Define interfaces for props with explicit typing
3. Use generics where appropriate
4. Leverage React types (ReactNode, ReactElement, etc.)
5. Prefer readonly arrays and immutable data structures

Example interface:
```typescript
interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'light' | 'medium' | 'dark';
  hoverEffect?: boolean;
  floatingAnimation?: boolean;
  onClick?: () => void;
}
```

### Styling Conventions
1. CSS files colocated with components
2. BEM-like naming methodology for classes
3. Variables for consistent color scheme:
   - Dark backgrounds: #0a0a0a, #1a1f3a
   - Accent colors: #00d4ff (electric blue), #ffd700 (gold), #00ff88 (aurora green)
4. Glass-morphism effects using backdrop-filter and rgba backgrounds
5. Extensive use of gradients for premium appearance
6. Responsive design with media queries

CSS Example:
```css
.glass-card {
  position: relative;
  padding: 2rem;
  border-radius: 20px;
  overflow: hidden;
  backdrop-filter: blur(20px);
  background: linear-gradient(
    135deg,
    rgba(0, 212, 255, 0.1) 0%,
    rgba(0, 0, 0, 0.2) 100%
  );
  border: 1px solid rgba(0, 212, 255, 0.2);
}
```

### Error Handling
1. Wrap asynchronous operations in try/catch blocks
2. Use React error boundaries for component-level error handling
3. Gracefully handle WebGL context loss in 3D components
4. Provide fallbacks for WebGL-unavailable environments
5. Log errors with descriptive messages for debugging

### Animation Patterns
1. Use GSAP for complex animations
2. Use CSS transitions for simple hover effects
3. Implement scroll-triggered animations with ScrollTrigger
4. Combine 3D transforms with GSAP for immersive experiences
5. Include reduced motion preferences for accessibility

### Performance Optimization
1. Use React.memo for components with static props
2. Implement useCallback for stable callback references
3. Lazy load 3D models and heavy assets
4. Use React suspense for component lazy loading
5. Optimize Three.js scenes with frustum culling
6. Implement Level of Detail (LOD) for 3D models

### Accessibility Standards
1. Semantic HTML markup
2. Proper heading hierarchy
3. Focus management for keyboard navigation
4. ARIA attributes for interactive components
5. Reduced motion preferences honored
6. Color contrast compliance for text

### GIT Workflow
1. Feature branches from main
2. Squash merge for clean history
3. Conventional commit messages:
   - feat: New feature
   - fix: Bug fix
   - chore: Maintenance work
   - refactor: Code restructuring
   - docs: Documentation updates
4. Pull requests reviewed before merge

### 3D Implementation Guidelines
1. Use Three.js for all 3D graphics
2. Follow PBR material workflow
3. Implement dynamic lighting that responds to interactions
4. Apply post-processing effects selectively (bloom, depth of field)
5. Model optimization for 60fps performance target
6. Include mobile fallbacks for complex 3D scenes