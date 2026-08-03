import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { translations } from '@/i18n/en';
import { SectionLabel } from '@/components/SectionLabel';
import { HairlineDivider } from '@/components/HairlineDivider';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

function ProjectCard({
  title,
  subtitle,
  module,
  description,
  skills,
}: {
  title: string;
  subtitle: string;
  module: string;
  description: string;
  skills: string;
}) {
  return (
    <div className="academic-card group bg-white border border-[#D8D4D0] p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)]">
      <h3 className="text-[24px] font-semibold uppercase tracking-[-0.01em] text-brand-black leading-tight">
        {title}
      </h3>
      <p className="text-[14px] text-brand-black font-medium mt-1">{subtitle}</p>
      <p className="text-label text-mid-gray mt-2">{module}</p>
      <p className="text-[16px] text-dark-gray leading-relaxed mt-4 line-clamp-3">
        {description}
      </p>
      <div className="mt-5 pt-4 border-t border-[#D8D4D0]">
        <p className="text-xs font-medium text-mid-gray leading-relaxed">{skills}</p>
      </div>
    </div>
  );
}

export function AcademicSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.academic-headline',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );

      gsap.fromTo(
        '.academic-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power4.out',
          scrollTrigger: { trigger: '.academic-grid', start: 'top 80%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={sectionRef} className="w-full bg-warm-stone py-[120px]">
      <div className="content-container">
        <SectionLabel text={translations.academic.label} />
        <h2 className="academic-headline text-section-headline text-brand-black">
          {translations.academic.headline}
        </h2>
        <HairlineDivider />
        <p className="text-body text-mid-gray mb-12 max-w-[640px]">
          {translations.academic.subheadline}
        </p>

        <div className="academic-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {translations.academic.projects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              subtitle={project.subtitle}
              module={project.module}
              description={project.description}
              skills={project.skills}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
