import { constructMetadata } from "@/hooks/useSeo";

export const metadata = constructMetadata({
  title: "Mock Exam | Tutelage Tests",
  description: "IELTS and academic speaking mock exam by Tutelage. Live online practice test with instructor following official IELTS speaking format (11-14 minutes). Assess fluency, pronunciation, grammar, and vocabulary under realistic exam conditions. Receive detailed performance evaluation highlighting strengths and improvement areas. Perfect for IELTS preparation and academic speaking assessment. Registration required with secure online payment. Practice in a quiet environment with microphone and camera for authentic exam experience.",
  path: '/tutelage-tests/mock-exam',
  ogImage: '/tutelagetest/mocktest/mock_1.avif',
});

export default function MockExamLayout({ children }) {
  return children;
}
