import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { translations } from '@/i18n/en';
import { SectionLabel } from '@/components/SectionLabel';
import { HairlineDivider } from '@/components/HairlineDivider';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Instagram } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skImages = [
  { src: '/assets/sk-flyers-01.png', alt: "Sarika's Kitchen food menu flyer with chaat items and catering photos" },
  { src: '/assets/sk-flyers-02.png', alt: "Sarika's Kitchen Kulfi Falooda promotional flyer in purple and yellow" },
  { src: '/assets/sk-grid-01.png', alt: "Sarika's Kitchen 3x3 social media grid with food and reviews" },
  { src: '/assets/sk-flyers-03.png', alt: "Sarika's Kitchen Prashad Box Navratri special flyer" },
  { src: '/assets/sk-sticker-01.png', alt: "Sarika's Kitchen Maida Mathri product label with nutritional info" },
];

const bookImages = [
  { src: '/assets/book-cover.png', alt: "'Dil Se' poem book cover with watercolor portrait and Hindi title" },
  { src: '/assets/book-page-1.png', alt: "Poem 'Nimohi' page with Hindi text and watercolor Radha-Krishna art" },
  { src: '/assets/book-page-2.png', alt: "Black-and-white daisy-framed photo with Hindi love poem" },
];

export function CreativeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.creative-headline',
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
        '.gallery-img',
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: '.gallery-grid', start: 'top 80%' },
        }
      );

      gsap.fromTo(
        '.creative-cta',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power4.out',
          scrollTrigger: { trigger: '.creative-cta', start: 'top 90%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  const t = translations.creative;

  return (
    <section
      id="creative"
      ref={sectionRef}
      className="w-full bg-warm-stone pt-20 pb-[120px]"
    >
      <div className="content-container">
        <SectionLabel text={t.label} />
        <h2 className="creative-headline text-section-headline text-brand-black">
          {t.headline}
        </h2>
        <HairlineDivider />
        <p className="text-body text-mid-gray mb-10 max-w-[640px]">{t.intro}</p>

        {/* Subset 1: SK Brand Identity */}
        <span className="text-label text-mid-gray block mb-4">{t.subset1Label}</span>
        <div className="gallery-grid grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {skImages.map((img, i) => (
            <div
              key={img.src}
              className={`gallery-img overflow-hidden ${
                i === 3 ? 'col-span-1 row-span-1' : ''
              } ${i === 4 ? 'col-span-2 lg:col-span-2' : ''}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover gallery-image aspect-[3/4]"
              />
            </div>
          ))}
        </div>

        {/* Subset 2: Poem Book */}
        <span className="text-label text-mid-gray block mb-4">{t.subset2Label}</span>
        <div className="gallery-grid grid grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {bookImages.map((img) => (
            <div key={img.src} className="gallery-img overflow-hidden">
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover gallery-image aspect-[3/4]"
              />
            </div>
          ))}
        </div>

        {/* Instagram CTA Bar */}
        <div className="creative-cta bg-brand-black p-8 lg:p-10 flex flex-col sm:flex-row items-center justify-center gap-6">
          <span className="text-[20px] font-semibold text-white uppercase text-center">
            {t.instagramCta}
          </span>
          <a
            href="https://www.instagram.com/sarikaskitchenandco/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-yellow text-sm"
          >
            <Instagram size={18} />
            {t.instagramButton}
          </a>
        </div>
      </div>
    </section>
  );
}
