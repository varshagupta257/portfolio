import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { translations } from '@/i18n/en';
import { SocialIcon } from '@/components/SocialIcon';
import { Download, Mail } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.footer-content',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power4.out',
          scrollTrigger: { trigger: footerRef.current, start: 'top 90%' },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, [reduced]);

  const t = translations.footer;

  return (
    <footer
      id="contact"
      ref={footerRef}
      className="w-full bg-brand-black pt-20 pb-10"
    >
      <div className="content-container">
        <div className="footer-content">
          {/* Top Row */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-10">
            {/* Left */}
            <div>
              <h3 className="text-[32px] font-bold text-white uppercase tracking-[0.04em]">
                {t.name}
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFEB3B]" />
                <span className="text-sm font-medium text-mid-gray">
                  {t.credential}
                </span>
              </div>
              <a
                href={`mailto:${t.email}`}
                className="inline-flex items-center gap-2 text-[16px] text-white hover:text-[#FFEB3B] transition-colors mt-4"
              >
                <Mail size={16} strokeWidth={1.5} />
                {t.email}
              </a>
            </div>

            {/* Right */}
            <div className="flex flex-col items-start lg:items-end gap-6">
              <a
                href="/Varsha_Gupta_Resume_General.docx"
                download
                className="btn-yellow"
              >
                <Download size={16} />
                {t.downloadResume}
              </a>
              <div className="flex items-center gap-5">
                <SocialIcon type="linkedin" href="https://www.linkedin.com/in/varshagupta05/" size={22} />
                <SocialIcon type="github" href="https://github.com/varshagupta257?tab=repositories" size={22} />
                <SocialIcon type="instagram" href="https://www.instagram.com/sarikaskitchenandco/" size={22} />
              </div>
            </div>
          </div>

          <div className="hairline-dark" />

          {/* Bottom Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-mid-gray">
            <span>
              {t.location} · {t.phone}
            </span>
            <span>{t.copyright}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
