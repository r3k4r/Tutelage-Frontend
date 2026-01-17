import { constructMetadata } from "@/hooks/useSeo";

export const metadata = constructMetadata({
  title: "PTE Preparation Course | Tutelage",
  description: "Specialized PTE Academic preparation at Tutelage for computer-based English proficiency testing. Globally recognized by universities, employers, and governments for study, work, and migration in Australia, New Zealand, Canada, and UK. 15-lesson course over 5 weeks (30 hours) covering speaking, writing, reading, and listening. Master automated scoring algorithms and computer-based test format. Choose group classes (3-5 students) or private lessons with qualified instructors. Authentic PTE-style practice tests, effective test-taking strategies, continuous feedback, and personalized coaching to achieve your target score.",
  ogImage: '/courses/proficiency/pte/pte_1.jpg',
  path: '/courses/Englishproficiencytests/ptepreparationcourse'
});

export default function CoursesLayout({ children }) {
  return children;
}
