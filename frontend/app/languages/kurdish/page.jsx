'use client'

import LanguageCoursePage from '@/components/pages/languages/LanguageCoursePage'

const images = {
  hero: '/languages/lan_ku.webp',
  online: '/languages/ku/private_classes.jpg',
  inPerson: '/languages/ku/inPerson_classes.jpg',
}

export default function Page() {
  return <LanguageCoursePage slug="kurdish" ns="KurdishCourse" course="Kurdish Language Classes" images={images} />
}
