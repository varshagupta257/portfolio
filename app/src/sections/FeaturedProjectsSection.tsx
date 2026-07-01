import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { translations } from '@/i18n/en';
import { SectionLabel } from '@/components/SectionLabel';
import { HairlineDivider } from '@/components/HairlineDivider';
import { getLenis } from '@/hooks/useLenis';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

function MetricBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-[rgba(255,235,59,0.1)] border border-[rgba(255,235,59,0.3)] p-5">
      <div className="text-[36px] font-bold text-[#FFEB3B] leading-none">{value}</div>
      <div className="text-label text-mid-gray mt-2">{label}</div>
    </div>
  );
}

function VideoPlayer({ src, caption }: { src: string; caption: string }) {
  return (
    <div>
      <div className="aspect-video bg-[#1A1A1A] overflow-hidden">
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        />
      </div>
      <p className="text-label text-mid-gray mt-3">{caption}</p>
    </div>
  );
}

export function FeaturedProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const ctx = gsap.context(() => {
      // Headline
      gsap.fromTo(
        '.fp-headline',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );

      // Project A: text from left, video from right
      gsap.fromTo(
        '.project-a-text',
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power4.out',
          scrollTrigger: { trigger: '.project-a', start: 'top 75%' },
        }
      );
      gsap.fromTo(
        '.project-a-video',
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power4.out',
          scrollTrigger: { trigger: '.project-a', start: 'top 75%' },
        }
      );

      // Project B: reversed
      gsap.fromTo(
        '.project-b-video',
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power4.out',
          scrollTrigger: { trigger: '.project-b', start: 'top 75%' },
        }
      );
      gsap.fromTo(
        '.project-b-text',
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power4.out',
          scrollTrigger: { trigger: '.project-b', start: 'top 75%' },
        }
      );

      // Metric boxes stagger
      gsap.fromTo(
        '.metric-box',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power4.out',
          scrollTrigger: { trigger: '.metric-box', start: 'top 85%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  const scrollToExperience = () => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo('#experience', { offset: -80 });
  };

  const projectA = translations.featured.projectA;
  const projectB = translations.featured.projectB;

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="w-full bg-brand-black py-[120px] lg:py-[160px]"
    >
      <div className="content-container">
        <SectionLabel text={translations.featured.label} light />
        <h2 className="fp-headline text-section-headline text-white">
          {translations.featured.headline}
        </h2>
        <HairlineDivider light={false} />

        {/* Project A: Zenith Dashboard */}
        <div className="project-a grid grid-cols-1 lg:grid-cols-[45%_55%] gap-10 lg:gap-12 mt-20">
          <div className="project-a-text">
            <span className="text-label text-[#FFEB3B] block mb-3">{projectA.label}</span>
            <h3 className="text-h2 text-white">{projectA.title}</h3>
            <p className="text-sm text-mid-gray mt-2">{projectA.module}</p>

            <p className="text-body text-[#999999] mt-6">{projectA.context}</p>

            <ul className="mt-6 space-y-3">
              {projectA.architecture.map((item, i) => (
                <li key={i} className="text-[16px] text-[#999999] leading-relaxed flex gap-3">
                  <span className="text-[#FFEB3B] mt-1 flex-shrink-0">—</span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-3 gap-3 mt-6">
              {projectA.metrics.map((m) => (
                <MetricBox key={m.label} value={m.value} label={m.label} />
              ))}
            </div>

            <p className="text-xs text-mid-gray mt-5">{projectA.skills}</p>
          </div>

          <div className="project-a-video">
            <VideoPlayer src="/assets/zenith-dashboard-video.mp4" caption={projectA.videoCaption} />
          </div>
        </div>

        <HairlineDivider light={false} />

        {/* Project B: ML Reconciliation */}
        <div className="project-b grid grid-cols-1 lg:grid-cols-[55%_45%] gap-10 lg:gap-12 mt-20">
          <div className="project-b-video order-2 lg:order-1">
            <VideoPlayer src="/assets/video-reconciliation.mp4" caption={projectB.videoCaption} />
          </div>

          <div className="project-b-text order-1 lg:order-2">
            <span className="text-label text-[#FFEB3B] block mb-3">{projectB.label}</span>
            <h3 className="text-h2 text-white">{projectB.title}</h3>
            <p className="text-sm text-mid-gray mt-2">{projectB.module}</p>

            <p className="text-body text-[#999999] mt-6">{projectB.context}</p>

            <ul className="mt-6 space-y-3">
              {projectB.architecture.map((item, i) => (
                <li key={i} className="text-[16px] text-[#999999] leading-relaxed flex gap-3">
                  <span className="text-[#FFEB3B] mt-1 flex-shrink-0">—</span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-3 gap-3 mt-6">
              {projectB.metrics.map((m) => (
                <MetricBox key={m.label} value={m.value} label={m.label} />
              ))}
            </div>

            <p className="text-xs text-mid-gray mt-5">{projectB.skills}</p>

            <button
              onClick={scrollToExperience}
              className="text-nav text-mid-gray hover:text-[#FFEB3B] transition-colors mt-6 block"
            >
              {projectB.backLink}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
