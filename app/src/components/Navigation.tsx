import { useState, useEffect, useCallback } from 'react';
import { translations } from '@/i18n/en';
import { SocialIcon } from './SocialIcon';
import { getLenis } from '@/hooks/useLenis';
import { X, Download, Mail } from 'lucide-react';

const navLinks = [
  { label: translations.nav.about, target: '#about' },
  { label: translations.nav.projects, target: '#projects' },
  { label: translations.nav.experience, target: '#experience' },
  { label: translations.nav.creative, target: '#creative' },
  { label: translations.nav.contact, target: '#contact' },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection('#' + entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [menuOpen]);

  const scrollTo = useCallback((target: string) => {
    setMenuOpen(false);
    const el = document.querySelector(target);
    if (el) {
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(target, { offset: -80 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-20 flex items-center transition-all duration-300 ${
          scrolled
            ? 'bg-[#0F0F0F]/92 backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <div className="content-container w-full flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo('#hero')}
            className="text-nav text-white hover:text-[#FFEB3B] transition-colors tracking-[0.12em] font-bold"
          >
            {translations.nav.name}
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => scrollTo(link.target)}
                className={`text-nav text-white hover:text-[#FFEB3B] transition-colors pb-1 ${
                  activeSection === link.target
                    ? 'border-b border-[#FFEB3B] text-[#FFEB3B]'
                    : ''
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="/Varsha_Gupta_Resume_General.pdf"
              download
              className="btn-yellow text-xs py-3 px-5"
            >
              <Download size={14} />
              {translations.nav.downloadResume}
            </a>
            <SocialIcon type="linkedin" href="https://www.linkedin.com/in/varshagupta05/" size={20} />
            <SocialIcon type="github" href="https://github.com/varshagupta257?tab=repositories" size={20} />
          </div>

          {/* Mobile Hamburger */}
          <button
            className={`md:hidden flex flex-col gap-1.5 w-6 ${menuOpen ? 'hamburger-open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="hamburger-line w-5 h-0.5 bg-white block" />
            <span className="hamburger-line w-5 h-0.5 bg-white block" />
            <span className="hamburger-line w-5 h-0.5 bg-white block" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-[#0F0F0F]/98 backdrop-blur-3xl flex flex-col items-center justify-center transition-opacity duration-500 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          className="absolute top-6 right-10 text-white"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <X size={28} strokeWidth={1.5} />
        </button>

        <nav className="flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.target}
              onClick={() => scrollTo(link.target)}
              className="text-h2 text-white hover:text-[#FFEB3B] transition-colors"
            >
              {link.label}
            </button>
          ))}
          <a
            href="/Varsha_Gupta_Resume_General.pdf"
            download
            className="btn-yellow mt-4"
            onClick={() => setMenuOpen(false)}
          >
            <Download size={16} />
            {translations.nav.downloadResume}
          </a>
        </nav>

        <div className="absolute bottom-12 flex items-center gap-6">
          <SocialIcon type="linkedin" href="https://www.linkedin.com/in/varshagupta05/" size={24} />
          <SocialIcon type="github" href="https://github.com/varshagupta257?tab=repositories" size={24} />
          <SocialIcon type="instagram" href="https://www.instagram.com/sarikaskitchenandco/" size={24} />
          <a
            href="mailto:varshagupta.red@gmail.com"
            className="text-[#666666] hover:text-[#FFEB3B] transition-colors text-sm flex items-center gap-2"
          >
            <Mail size={20} strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </>
  );
}
