import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { translations } from '@/i18n/en';
import { SocialIcon } from '@/components/SocialIcon';
import { getLenis } from '@/hooks/useLenis';
import { Download, ArrowDown } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Name letter animation
      if (nameRef.current) {
        const letters = nameRef.current.querySelectorAll('.name-letter');
        tl.fromTo(
          letters,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.03 },
          0
        );
      }

      // Headline
      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.3
      );

      // Subheadline
      tl.fromTo(
        subRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.5
      );

      // CTAs
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.7
      );

      // Headshot
      tl.fromTo(
        imgRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1, ease: 'power3.inOut' },
        0.4
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  const scrollToWork = () => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo('#projects', { offset: -80 });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[100dvh] bg-brand-black overflow-hidden"
    >
      {/* Background "VG" watermark */}
      <div className="absolute bottom-[-100px] right-[-100px] text-[400px] font-extrabold text-white/[0.015] tracking-[-0.04em] select-none pointer-events-none z-0 leading-none">
        VG
      </div>

      <div className="content-container relative z-10 pt-[140px] pb-6 min-h-[100dvh] flex flex-col">
        {/* Main grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[55%_45%] gap-0 items-center">
          {/* Left: Text */}
          <div className="pr-0 lg:pr-[60px] order-2 lg:order-1">
            <span className="text-label text-mid-gray block mb-4">
              {translations.hero.label}
            </span>

            <h1 ref={nameRef} className="text-hero-name text-white mb-2 max-w-full leading-none">
              <span className="name-letter block">VARSHA</span>
              <span className="name-letter block mt-1 sm:mt-2">GUPTA</span>
            </h1>

            <h2
              ref={headlineRef}
              className="text-[32px] lg:text-[48px] font-semibold text-white leading-tight mt-6 max-w-[480px]"
            >
              {translations.hero.headline}
            </h2>

            <p
              ref={subRef}
              className="text-body text-mid-gray mt-4 max-w-[480px]"
            >
              {translations.hero.subheadline}
            </p>

            <div ref={ctaRef} className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="/Varsha_Gupta_Resume_General.pdf"
                download
                className="btn-yellow"
              >
                <Download size={16} />
                {translations.nav.downloadResume}
              </a>
              <button
                onClick={scrollToWork}
                className="btn-secondary-dark"
              >
                {translations.nav.viewWork}
                <ArrowDown size={16} />
              </button>
            </div>

            <div className="mt-8 flex items-center gap-5">
              <SocialIcon type="linkedin" href="https://www.linkedin.com/in/varshagupta05/" size={22} />
              <SocialIcon type="github" href="https://github.com/varshagupta257?tab=repositories" size={22} />
              <a
                href="mailto:varshagupta.red@gmail.com"
                className="text-sm text-mid-gray hover:text-white transition-colors ml-1"
              >
                varshagupta.red@gmail.com
              </a>
            </div>
          </div>

          {/* Right: Headshot */}
          <div className="relative h-[50vh] lg:h-[calc(100dvh-180px)] overflow-hidden order-1 lg:order-2 mb-8 lg:mb-0">
            <img
              ref={imgRef}
              src="/assets/varsha-profile.png"
              alt="Varsha Gupta professional headshot"
              className="w-full h-full object-cover object-center saturate-[0.85] contrast-[1.05]"
              loading="eager"
            />
            {/* Gradient overlay blending left edge */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F] via-[#0F0F0F]/40 to-transparent" />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between mt-8 lg:mt-0">
          <span className="text-label text-mid-gray">
            {translations.hero.location}
          </span>
          <span className="text-label text-mid-gray hidden sm:block">
            {translations.hero.credential}
          </span>
          {/* Scroll indicator */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-px h-[40px] bg-mid-gray relative">
              <div className="w-1.5 h-1.5 rounded-full bg-mid-gray absolute top-0 left-1/2 -translate-x-1/2 scroll-indicator-dot" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
