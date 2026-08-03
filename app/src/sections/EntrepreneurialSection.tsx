import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { translations } from '@/i18n/en';
import { SectionLabel } from '@/components/SectionLabel';
import { HairlineDivider } from '@/components/HairlineDivider';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Instagram, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function EntrepreneurialSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.ent-brand',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );

      gsap.fromTo(
        '.ent-headline',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: 0.1,
          ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );

      gsap.fromTo(
        '.ent-paragraph',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power4.out',
          scrollTrigger: { trigger: '.ent-right', start: 'top 80%' },
        }
      );

      gsap.fromTo(
        '.ent-metric',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power4.out',
          scrollTrigger: { trigger: '.ent-metrics', start: 'top 85%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  const t = translations.entrepreneurial;

  return (
    <section ref={sectionRef} className="w-full bg-warm-stone pt-[120px] pb-20">
      <div className="content-container">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-10 lg:gap-[60px]">
          {/* Left: Brand */}
          <div className="ent-brand">
            <img
              src="/assets/SKlogo.jpeg"
              alt="Sarika's Kitchen & Co. brand logo"
              className="max-w-[280px] lg:max-w-[320px] w-full mb-8 rounded-2xl border border-[#D8D4D0] bg-white p-4 object-contain shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
            />
            <h3 className="text-[32px] font-semibold text-brand-black">
              {t.brandName}
            </h3>
            <p className="text-[16px] text-mid-gray mt-1">{t.role}</p>
            <p className="text-sm text-mid-gray mt-1">
              {t.period}
            </p>
            <a
              href="https://www.instagram.com/sarikaskitchenandco/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-brand-black hover:text-[#FFEB3B] transition-colors mt-4 border-b border-[#D8D4D0] pb-1"
            >
              <Instagram size={18} />
              {t.instagramHandle}
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Right: Story */}
          <div className="ent-right">
            <SectionLabel text={t.label} />
            <h2 className="ent-headline text-h2 text-brand-black">
              {t.headline}
            </h2>

            <p className="ent-paragraph text-body text-dark-gray mt-6">
              {t.paragraph1}
            </p>
            <p className="ent-paragraph text-body text-dark-gray mt-5">
              {t.paragraph2}
            </p>
            <p className="ent-paragraph text-body text-dark-gray mt-5">
              {t.paragraph3}
            </p>

            <div className="ent-metrics grid grid-cols-3 gap-6 mt-10">
              {t.metrics.map((m) => (
                <div key={m.label} className="ent-metric">
                  <div className="text-[36px] font-bold text-brand-black leading-none">
                    {m.value}
                  </div>
                  <div className="text-label text-mid-gray mt-2">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <HairlineDivider className="mt-16" />
      </div>
    </section>
  );
}
