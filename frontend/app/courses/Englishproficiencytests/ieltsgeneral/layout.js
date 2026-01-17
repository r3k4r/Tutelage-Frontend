import { constructMetadata } from "@/hooks/useSeo";

export const metadata = constructMetadata({
  title: "IELTS General Training | Tutelage",
  description: "Targeted IELTS General Training preparation at Tutelage for work and family visa applications, migration, and vocational training. Accepted by immigration authorities and employers in 140+ countries including UK, Canada, Australia, New Zealand, USA, Ireland, and Singapore. 15-lesson course over 5 weeks (30 hours) focusing on practical everyday English skills: speaking, writing, reading, and listening. Choose small group classes (3-5 students) or private one-on-one lessons with certified IELTS instructors. Authentic practice materials, personalized feedback, and smart test strategies for workplace English and community integration success.",
  ogImage: '/courses/proficiency/general/general_1.jpg',
  path: '/courses/Englishproficiencytests/ieltsgeneral'
});

export default function CoursesLayout({ children }) {
  return children;
}
