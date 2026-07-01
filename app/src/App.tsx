import { useLenis } from '@/hooks/useLenis';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/sections/HeroSection';
import { AboutSection } from '@/sections/AboutSection';
import { FeaturedProjectsSection } from '@/sections/FeaturedProjectsSection';
import { AcademicSection } from '@/sections/AcademicSection';
import { ExperienceSection } from '@/sections/ExperienceSection';
import { EntrepreneurialSection } from '@/sections/EntrepreneurialSection';
import { CreativeSection } from '@/sections/CreativeSection';
import { Footer } from '@/sections/Footer';

function App() {
  useLenis();

  return (
    <div className="relative">
      {/* Skip to content link for accessibility */}
      <a href="#about" className="skip-link">
        Skip to content
      </a>

      <Navigation />

      <main>
        <HeroSection />
        <AboutSection />
        <FeaturedProjectsSection />
        <AcademicSection />
        <ExperienceSection />
        <EntrepreneurialSection />
        <CreativeSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;
