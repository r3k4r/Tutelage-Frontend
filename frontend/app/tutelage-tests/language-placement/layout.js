import { constructMetadata } from "@/hooks/useSeo";

export const metadata = constructMetadata({
  title: "Language Placement Test | Tutelage Tests",
  description: "Comprehensive online English placement test by Tutelage. Live speaking & comprehension test with instructor (15-20 minutes) evaluates real-time communication, fluency, and listening skills. Self-paced detailed listening, reading & writing test (15 minutes) includes interactive exercises and writing tasks. Get a complete evaluation covering vocabulary, grammar, all four skills for accurate course placement. Registration required. Book your placement test today and receive personalized recommendations for your English learning journey.",
  path: '/tutelage-tests/language-placement',
  ogImage: '/tutelagetest/languageplacement/lang_1.avif',
});

export default function LanguagePlacementLayout({ children }) {
  return children;
}
