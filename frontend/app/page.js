import GlobalTestMastery from '@/components/pages/home/GlobalTestMastery'
import HeroSection from '@/components/pages/home/Hero'
import ImproveYourEnglishSkills from '@/components/pages/home/ImproveYourEnglishSkills'
import OnlineCourses from '@/components/pages/home/OnlineCourses'
import Practice from '@/components/pages/home/Practice'
import Resources from '@/components/pages/home/Resources'
import Tests from '@/components/pages/home/Tests'
import TutelageAi from '@/components/pages/home/TutelageAi'


export default async function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <HeroSection />
      <TutelageAi />
      <Resources />
      <OnlineCourses />
      <Tests />
      <GlobalTestMastery />
      <Practice />
      <ImproveYourEnglishSkills />
    </>
  )
}