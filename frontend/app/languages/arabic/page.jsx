'use client'

import LanguageCoursePage from '@/components/pages/languages/LanguageCoursePage'

const images = {
  hero: '/languages/lang_ar.jpg',
  online: '/languages/ar/private_classes.jpg',
  inPerson: '/languages/ar/inPerson_classes.jpg',
}

export default function Page() {
  return <LanguageCoursePage slug="arabic" ns="ArabicCourse" course="Arabic Language Classes" images={images} />
}
