# Varsha Gupta Portfolio — Tech Spec

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^18.3.1 | UI framework |
| `react-dom` | ^18.3.1 | DOM renderer |
| `gsap` | ^3.12.7 | Core animation engine + ScrollTrigger plugin |
| `lenis` | ^1.1.13 | Smooth scroll |
| `lucide-react` | ^0.468.0 | Icons (LinkedIn, GitHub, Instagram, Menu, X, Download, ArrowUpRight, Mail, ExternalLink) |
| `tailwindcss` | ^3.4.19 | Utility-first CSS |
| `typescript` | ^5.6.3 | Type safety |
| `vite` | ^6.0.0 | Build tool |
| `@types/react` | ^18.3.12 | React type definitions |
| `@types/react-dom` | ^18.3.1 | React DOM type definitions |

No shadcn/ui components needed — design is fully custom.

## Component Inventory

### Layout

| Component | Source | Reuse |
|-----------|--------|-------|
| `Navigation` | Custom | 1× (fixed header) |
| `MobileMenu` | Custom | 1× (fullscreen overlay) |
| `Footer` | Custom | 1× |

### Sections (single page, 7 content sections)

| Component | Notes |
|-----------|-------|
| `HeroSection` | Split-screen: text left (name, headline, CTAs, socials) + headshot right |
| `AboutSection` | Two-column: narrative left + skills matrix card right + stats bar |
| `FeaturedProjectsSection` | Dark bg. Two project case studies (A: dashboard, B: reconciliation) with videos |
| `AcademicSection` | Light bg. 2-column grid of 5 project cards |
| `ExperienceSection` | Dark bg. 4 timeline rows with period/company/title/description/skills |
| `EntrepreneurialSection` | Light bg. Brand logo left + story + metrics right |
| `CreativeSection` | Light bg. Image gallery (5 SK + 3 book) + Instagram CTA bar |

### Reusable Components

| Component | Source | Used By |
|-----------|--------|---------|
| `HairlineDivider` | Custom | All sections |
| `SectionLabel` | Custom | All sections (11px uppercase meta label) |
| `YellowCTAButton` | Custom | Hero, About, Footer ("Download Resume") |
| `SecondaryCTAButton` | Custom | Hero ("View Featured Work") |
| `SocialIcon` | Custom | Hero, Footer, MobileMenu |
| `ProjectCard` | Custom | AcademicSection |
| `MetricBox` | Custom | FeaturedProjectsSection, EntrepreneurialSection |
| `VideoPlayer` | Custom | FeaturedProjectsSection (autoplay muted loop) |
| `ExperienceRow` | Custom | ExperienceSection |

### Hooks

| Hook | Purpose |
|------|---------|
| `useLenis` | Initialize Lenis smooth scroll, expose scroll-to method |
| `useScrollReveal` | GSAP ScrollTrigger entrance animation for any section |
| `useReducedMotion` | Detect `prefers-reduced-motion`, disable animations |

## Animation Implementation

| Animation | Library | Approach | Complexity |
|-----------|---------|----------|------------|
| Hero name letter stagger | GSAP | Split text into spans, stagger `y` + `opacity` | Medium |
| Hero headline/subheadline/CTA fade-in | GSAP | Timeline with sequential delays | Low |
| Hero headshot scale-in | GSAP | `scale(0.95)` → `scale(1)` with opacity | Low |
| Nav slide-down | GSAP | `translateY(-100%)` → `translateY(0)` | Low |
| Nav background transition | CSS | `transition` on scroll state change | Low |
| Scroll-triggered section entrance | GSAP + ScrollTrigger | Batch pattern: label+headline fade up, content stagger | Medium |
| Hairline divider width animation | GSAP + ScrollTrigger | `width: 0%` → `width: 100%` | Low |
| Stats count-up | GSAP | `gsap.to()` on a proxy object, update DOM | Low |
| Project A/B slide-in (opposite directions) | GSAP + ScrollTrigger | Text from left, video from right (and reversed for B) | Medium |
| Experience rows stagger slide | GSAP + ScrollTrigger | `translateX(-30px)` stagger | Low |
| Gallery image stagger | GSAP + ScrollTrigger | `scale(0.95)` + `opacity` stagger | Low |
| Card hover lift + shadow | CSS | `translateY(-4px)` + `box-shadow` transition | Low |
| Button hover states | CSS | Background/color swap + `translateY(-2px)` | Low |
| Mobile menu open/close | GSAP | Overlay fade + items stagger from `translateY(40px)` | Medium |
| Hamburger → X morph | CSS | Line rotation + opacity transitions | Low |
| Scroll indicator dot | CSS | `@keyframes` bounce animation | Low |

## State & Logic

### Navigation Scroll Behavior
- Track scroll position via Lenis scroll callback
- Below hero height (~100vh): switch nav from transparent to solid dark with blur
- IntersectionObserver on each section to update active nav link
- Use `mix-blend-mode: difference` on nav text for automatic contrast

### Mobile Menu
- `isMenuOpen: boolean` toggled by hamburger click
- Lock body scroll when open (`overflow: hidden`)
- Close on Escape key, close on overlay click
- Hamburger icon morphs to X via CSS transforms on 3 lines

### Resume Download
- All "Download Resume" CTAs link to the same resume file
- Use `<a href="..." download>` for direct download
- File must be copied to `public/` directory

### Multi-Language
- All UI strings stored in `src/i18n/en.ts`
- Content components import strings via translation keys
- Hindi poem text marked with `lang="hi"`

## Other Key Decisions

### Single-Page Architecture
No routing needed — all sections on one page with anchor smooth-scroll. React Router would add unnecessary complexity.

### Asset Strategy
All user-uploaded images and videos copied to `public/` directory:
- `public/assets/headshot.jpg` — hero portrait
- `public/assets/video-dashboard.mp4` — project A video
- `public/assets/video-reconciliation.mp4` — project B video
- `public/assets/sk-logo.png`, `sk-flyers-01.png`, etc. — gallery images
- `public/assets/book-cover.png`, `book-page-1.png`, etc. — book images
- `public/Varsha_Gupta_Resume_General.docx` — resume download

### Responsive Breakpoints
| Name | Width | Tailwind Prefix |
|------|-------|-----------------|
| Mobile | < 768px | default |
| Tablet | 768–1279px | `md:` |
| Desktop | ≥ 1280px | `lg:` |

### Performance
- Images: `loading="lazy"` for below-fold, eager for hero headshot
- Videos: `preload="metadata"`, autoplay muted loop
- GSAP ScrollTrigger: batch initialization, cleanup on unmount
- `will-change: transform, opacity` on animated elements
