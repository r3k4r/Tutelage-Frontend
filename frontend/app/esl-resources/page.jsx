'use client'

import ESLResourcesHero from "@/components/pages/esl-resources/ESLResourcesHero"
import FourEasySteps from "@/components/pages/esl-resources/FourEasySteps"
import Resources from "@/components/pages/esl-resources/Resources"
import AICallToAction from "@/components/shared/cta/AICallToAction"

const ESLResourcesPage = () => {
  return (
    <div>
      <ESLResourcesHero />
      <FourEasySteps />
      <Resources />
      <AICallToAction />
    </div>
  )
}

export default ESLResourcesPage