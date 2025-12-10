'use client'

import SingleProficiencyTest from '@/components/courses/SingleProficiencyTest'

export default function PTEPreparationPage() {
  return (
    <SingleProficiencyTest
      title="PTE Preparation Course"
      heroImage="/courses/proficiency/pte/pte_1.jpg"
      description="Ace the PTE Academic with our specialized preparation program designed for the computer-based test format. Master all sections with expert strategies, automated scoring insights, and comprehensive practice materials."
      
      firstSectionTitle="PTE Test Preparation Course"
      firstSectionContent="The Pearson Test of English (PTE Academic) is a globally recognized, computer-based exam that measures your English proficiency in speaking, writing, reading, and listening. It's accepted by universities, employers, and governments worldwide for study, work, and migration purposes."
      
      showSecondSection={true}
      secondSectionTitle="Why Choose PTE?"
      secondSectionContent="Our PTE Preparation Course is designed to help you achieve your target score through practical lessons, authentic practice tests, and personalized feedback. You'll master test strategies, improve fluency, and build confidence to perform your best on exam day."
      secondSectionBulletPoints={[
        "University Admissions: Accepted by thousands of universities and colleges worldwide as proof of English ability.",
        "Visa Applications: Approved for study, work, and migration visas in countries like Australia, New Zealand, Canada, and the UK.",
        "Professional Registration: Used by organizations and employers to assess English communication skills.",
        "Language Certification: Provides an official and reliable measure of English proficiency for global recognition."
      ]}
      secondSectionImage="/courses/proficiency/pte/pte_2.jpg"
      
      showThirdSection={false}
      thirdSectionTitle="PTE Course Futures"
      thirdSectionBulletPoints={[
        {
          title: "Online course:",
          description: "15 lessons over 5 weeks (30 hours total)"
        },
        {
          title: "Choose group of 3 to 5 students or individual private lessons:",
          description: ""
        },
        {
          title: "Comprehensive skill coverage:",
          description: "Speaking, writing, reading, and listening"
        },
        {
          title: "Effective study strategies and test-taking techniques:",
          description: ""
        },
        {
          title: "Continuous feedback:",
          description: "Track progress and improve performance"
        },
        {
          title: "Real PTE-style practice tests and materials:",
          description: ""
        },
        {
          title: "Expert guidance from qualified instructors:",
          description: ""
        }
      ]}
      
      showFourthSection={true}
      fourthSectionFeatures={[
        " Online course: 15 lessons over 5 weeks (30 hours total)",
        " Choose group of 3 to 5 students or individual private lessons",
        "Comprehensive skill coverage: Speaking, writing, reading, and listening",
        " Effective study strategies and test-taking techniques",
        "Continuous feedback to track progress and improve performance",
        "Real PTE-style practice tests and materials",
        "Expert guidance from qualified instructors"
      ]}
    />
  )
}
