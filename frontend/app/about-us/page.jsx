import AboutUsContent from '@/components/pages/about-us/AboutUsContent';
import AboutUsHero from '@/components/pages/about-us/AboutUsHero';
import AchievementsSection from '@/components/pages/about-us/AchievementsSection';
import { Foundation } from '@/components/pages/about-us/Foundation';
import PartnershipsSection from '@/components/pages/about-us/PartnershipsSection';
import TutelageAiAbout from '@/components/pages/about-us/TutelageAiAbout';

const AboutUs = () => {
  return (
    <div>
      <AboutUsHero />
      <AboutUsContent />
      <Foundation />
      <TutelageAiAbout />
      <AchievementsSection />
      <PartnershipsSection />
    </div>
  )
}

export default AboutUs