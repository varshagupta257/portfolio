import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { translations } from '@/i18n/en';
import { SectionLabel } from '@/components/SectionLabel';
import { HairlineDivider } from '@/components/HairlineDivider';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

function ExperienceRow({
  period,
  location,
  company,
  title,
  bullets,
  skills,
}: {
  period: string;
  location: string;
  company: string;
  title: string;
  bullets: readonly string[];
  skills: string;
}) {
  return (
    <div className="exp-row py-10 lg:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr_1fr] gap-6 lg:gap-10">
        {/* Left: Period + Company */}
        <div>
          <p className="text-sm text-mid-gray">
            {period} · {location}
          </p>
          <h4 className="text-[20px] font-semibold text-white mt-1">{company}</h4>
        </div>

        {/* Center: Title + Description */}
        <div>
          <h5 className="text-[24px] font-semibold text-white uppercase tracking-[-0.01em]">
            {title}
          </h5>
          <ul className="mt-4 space-y-2">
            {bullets.map((b, i) => (
              <li key={i} className="text-[16px] text-[#999999] leading-relaxed flex gap-3">
                <span className="text-[#FFEB3B] flex-shrink-0 mt-1">—</span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Skills */}
        <div>
          <p className="text-xs text-mid-gray leading-[1.8]">{skills}</p>
        </div>
      </div>
    </div>
  );
}

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.exp-label',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );

      gsap.fromTo(
        '.exp-headline',
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
        '.exp-row',
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power4.out',
          scrollTrigger: { trigger: '.exp-timeline', start: 'top 75%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="w-full bg-brand-black py-[120px] lg:py-[160px]"
    >
      <div className="content-container">
        <SectionLabel text={translations.experience.label} light className="exp-label" />
        <h2 className="exp-headline text-section-headline text-white">
          {translations.experience.headline}
        </h2>
        <HairlineDivider light={false} />

        <div className="exp-timeline flex flex-col">
          {translations.experience.roles.map((role, i) => (
            <div key={role.company}>
              {i > 0 && <div className="hairline-dark" />}
              <ExperienceRow
                period={role.period}
                location={role.location}
                company={role.company}
                title={role.title}
                bullets={role.bullets}
                skills={role.skills}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
