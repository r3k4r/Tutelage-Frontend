import { Suspense } from "react";

export const metadata = {
  title: "Search | Tutelage",
  description: "Find the perfect resources and courses on Tutelage. Our search feature helps you easily locate English learning materials, courses for kids, teens, and adults, as well as free ESL resources like videos, audios, blogs, and stories. Whether you're looking for CEFR-leveled practice (A1-C1), IELTS/TOEFL/PTE preparation materials, or specific English proficiency tests, our search tool is designed to connect you with the content you need to achieve your language learning goals.",
};

export default function CoursesLayout({ children }) {
  return (
    <Suspense fallback={null}>
      {children}
    </Suspense>
  );
}
