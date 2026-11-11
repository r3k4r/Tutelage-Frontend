'use client'

import LevelsHero from '@/components/pages/levels/LevelsHero'
import LevelsDescription from '@/components/pages/levels/LevelsDescription'
import LevelsCards from '@/components/pages/levels/LevelsCards'

const LevelsMainPage = () => {
  return (
    <div className="relative min-h-screen bg-background pt-4">
      <LevelsHero />
      <LevelsDescription />
      <LevelsCards />
    </div>
  )
}

export default LevelsMainPage
