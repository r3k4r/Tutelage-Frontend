import { constructMetadata } from "@/hooks/useSeo";

export const metadata = constructMetadata({
  title: "TOEFL Preparation Course | Tutelage",
  description: "Comprehensive TOEFL iBT preparation at Tutelage for students aiming to study at American universities and institutions worldwide. Widely recognized for undergraduate and graduate admissions, scholarships, study/work visa applications, and professional registration. 15-lesson course over 5 weeks (30 hours) covering reading, listening, speaking, and writing sections. Choose small group classes (3 students) or private one-on-one lessons with experienced TOEFL instructors. Proven test strategies, authentic practice materials, ongoing personalized feedback, and smart learning techniques to achieve your target score for academic English proficiency.",
  ogImage: '/courses/proficiency/toefl/toefl_1.jpg',
  path: '/courses/Englishproficiencytests/toeflpreparationcourse'
});

export default function CoursesLayout({ children }) {
  return children;
}
