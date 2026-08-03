import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { translations } from '@/i18n/en';
import { SectionLabel } from '@/components/SectionLabel';
import { ArrowUpRight, Download } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  translations.about.skills.productivity,
  translations.about.skills.financeTools,
  translations.about.skills.automation,
  translations.about.skills.technical,
  translations.about.skills.languages,
  translations.about.skills.memberships,
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const ctx = gsap.context(() => {
      // Headline fade up
      gsap.fromTo(
        '.about-headline',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Divider width animation
      gsap.fromTo(
        dividerRef.current,
        { width: '0%' },
        {
          width: '100%',
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: dividerRef.current,
            start: 'top 85%',
          },
        }
      );

      // Paragraphs stagger
      gsap.fromTo(
        '.about-paragraph',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.about-left',
            start: 'top 75%',
          },
        }
      );

      // Skills card
      gsap.fromTo(
        '.skills-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.skills-card',
            start: 'top 80%',
          },
        }
      );

      // Stats stagger
      gsap.fromTo(
        '.about-stat',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.about-stats',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full bg-warm-stone section-padding-light"
    >
      <div className="content-container">
        <SectionLabel text={translations.about.label} />

        <h2 className="about-headline text-section-headline text-brand-black">
          {translations.about.headline}
        </h2>

        <div ref={dividerRef} className="hairline-light overflow-hidden" style={{ width: '0%' }} />

        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-10 lg:gap-[60px]">
          {/* Left: Narrative */}
          <div className="about-left">
            <p className="about-paragraph text-body text-dark-gray max-w-[600px]">
              {translations.about.paragraph1}
            </p>
            <p className="about-paragraph text-body text-dark-gray max-w-[600px] mt-6">
              {translations.about.paragraph2}
            </p>
            <p className="about-paragraph text-body text-dark-gray max-w-[600px] mt-6">
              {translations.about.paragraph3}
            </p>

            <a
              href="/Varsha_Gupta_Resume_General.pdf"
              download
              className="about-paragraph inline-flex items-center gap-2 text-sm font-semibold text-brand-black border-b border-brand-black hover:text-[#FFEB3B] hover:border-[#FFEB3B] transition-colors mt-8 pb-1"
            >
              <Download size={16} />
              {translations.about.downloadFullResume}
            </a>
          </div>

          {/* Right: Skills Matrix */}
          <div className="skills-card bg-white border border-[#D8D4D0] p-8 lg:p-10">
            <h3 className="text-[24px] font-semibold uppercase tracking-[-0.01em] text-brand-black mb-6">
              {translations.about.skillsTitle}
            </h3>

            <div className="space-y-5">
              {skillCategories.map((cat) => (
                <div key={cat.title}>
                  <span className="text-label text-mid-gray font-semibold block mb-1">
                    {cat.title}
                  </span>
                  <p className="text-sm text-dark-gray leading-relaxed">
                    {cat.items}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-[#D8D4D0]">
              <a
                href="https://github.com/varshagupta257?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="text-nav text-brand-black hover:text-[#FFEB3B] transition-colors flex items-center gap-2"
              >
                {translations.about.githubLink}
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="about-stats grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          {Object.values(translations.about.stats).map((stat) => (
            <div key={stat.label} className="about-stat">
              <div className="text-[48px] font-bold text-brand-black tracking-[-0.02em] leading-none">
                {stat.value}
              </div>
              <div className="text-label text-mid-gray mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
