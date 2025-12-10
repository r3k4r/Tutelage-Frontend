import SkillPageTemplate from '@/components/skills/SkillPageTemplate'

export default function ListeningPage() {
  const listeningData = {
    title: "Listening Skill",
    heroImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    description: "Our listening materials help learners practice listening independently to understand spoken English step by step from simple everyday expressions to complex conversations and ideas.",
    coursesButtonText: "Explore courses",
    whyUseSection: {
      title: "Why use these materials?",
      content: "These resources allow learners to practice independently and strengthen listening skills at their own pace. Practicing listening improves comprehension, vocabulary, and the ability to understand real-life, academic, and professional texts. Enroll in our courses to access structured guidance, interactive exercises, and expert support to improve your reading, listening, speaking, and writing skills — and reach your English goals faster."
    },
    levels: [
      {
        code: "A1",
        title: "A1 – Beginner",
        href: "/skills/listening/a1",
        image: "/skills/listening/listening_1.jpg",
        description: "Listening practices designed to help learners understand familiar everyday expressions, very simple sentences, and basic words related to people or their family. Activities include matching words to pictures, filling in missing words, and answering simple questions."
      },
      {
        code: "A2",
        title: "A2 – Elementary",
        href: "/skills/listening/a2",
        image: "/skills/listening/listening_2.jpg",
        description: "Listening practices focused on common phrases and vocabulary related to personal information, shopping, work, and family. Exercises include identifying main ideas in short texts, completing conversations, and choosing correct responses in everyday situations."
      },
      {
        code: "B1",
        title: "B1 – Intermediate",
        href: "/skills/listening/b1",
        image: "/skills/listening/listening_3.jpg",
        description: "Listening practices that help learners understand clear, standard speech on familiar topics such as work, school, leisure, travel, and daily life. Activities include summarizing main points, understanding opinions, and following simple discussions even with some unknown words."
      },
      {
        code: "B2",
        title: "B2 – Upper Intermediate",
        href: "/skills/listening/b2",
        image: "/skills/listening/listening_4.jpg",
        description: "Listening practices designed to help learners understand extended speech, TV programs, films, podcasts, and interviews on concrete or abstract topics. Exercises include recognizing cause–effect relationships, following arguments and opinions, and identifying supporting examples."
      },
      {
        code: "C1",
        title: "C1 – Advanced",
        href: "/skills/listening/c1",
        image: "/skills/listening/listening_5.jpg",
        description: "Listening practices for learners to understand extended, complex speech even when it is not clearly structured and when ideas are implied. Activities include recognizing sarcasm, subtle opinions, implied meanings, tone, humor, and culture-based references in debates, lectures, podcasts, and films."
      }
    ]
  }

  return <SkillPageTemplate skillData={listeningData} />
}
