import { constructMetadata } from "@/hooks/useSeo";

export const metadata = constructMetadata({
  title: "English For Adults | Tutelage",
  description: "Comprehensive English language program for adult learners with busy schedules. Master speaking, listening, reading, and writing skills through interactive lessons. Choose from group classes or private one-on-one sessions with flexible scheduling. Available both online and in-person at our Kurdistan locations. Perfect for professionals and adults seeking fluency for travel, work, or personal development. Includes placement tests, continuous feedback, and Tutelage certificate. Contact us at (964+) 07501534240 or 07701946364 for in-person classes.",
  ogImage: '/courses/adults/adults_1.jpg',
  path: '/courses/englishforadults'
});

export default function CoursesLayout({ children }) {
  return children;
}
