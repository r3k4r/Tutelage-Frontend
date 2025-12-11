import SkillPageTemplate from '@/components/skills/SkillPageTemplate'

export default function WritingPage() {
  const writingData = {
    title: "Writing Skill",
    heroImage: "/skills/write.jpg",
    description: "Our writing materials help learners practice writing independently, developing accuracy, clarity, and the ability to express ideas step by step from simple sentences to complex texts.",
    coursesButtonText: "Explore courses",
    whyUseSection: {
      title: "Why use these materials?",
      content: "These resources allow learners to practice independently and improve their writing skills at their own pace. Practicing writing develops vocabulary, grammar, structure, and the ability to communicate ideas effectively. Enroll in our courses to access expert guidance, interactive exercises, and feedback to strengthen your writing, reading, listening, and speaking skills — and achieve your English goals efficiently."
    },
    levels: [
      {
        code: "A1",
        title: "A1 – Beginner",
        href: "/skills/writing/a1",
        image: "/skills/writing/writing_1.jpg",
        description: "Writing practices to help learners write simple sentences about themselves, their family, and daily routines. Activities include filling in missing words, matching words to pictures, and completing short guided sentences."
      },
      {
        code: "A2",
        title: "A2 – Elementary",
        href: "/skills/writing/a2",
        image: "/skills/writing/writing_2.jpg",
        description: "Writing practices for learners to write short messages and simple paragraphs about personal information, shopping, work, and daily life. Activities include completing forms, short emails, and guided paragraph writing."
      },
      {
        code: "B1",
        title: "B1 – Intermediate",
        href: "/skills/writing/b1",
        image: "/skills/writing/writing_3.jpg",
        description: "Writing practices to help learners write clear, connected texts on familiar topics such as travel, school, work, and leisure. Activities include describing experiences, giving opinions, and writing short essays or stories."
      },
      {
        code: "B2",
        title: "B2 – Upper Intermediate",
        href: "/skills/writing/b2",
        image: "/skills/writing/writing_4.jpg",
        description: "Writing practices for learners to produce extended texts with logical structure and clear arguments. Activities include essays, reports, reviews, and formal letters, focusing on linking ideas, supporting arguments, and expressing opinions fluently."
      },
      {
        code: "C1",
        title: "C1 – Advanced",
        href: "/skills/writing/c1",
        image: "/skills/writing/writing_5.jpg",
        description: "Writing practices to help learners write complex texts with nuance, style, and clarity. Activities include academic essays, professional reports, and opinion pieces, with a focus on tone, emphasis, coherence, and implied meaning."
      }
    ]
  }

  return <SkillPageTemplate skillData={writingData} />
}
