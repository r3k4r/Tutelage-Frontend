import { constructMetadata } from "@/hooks/useSeo";
import { Suspense } from "react";

export const metadata = constructMetadata({
  title: "Levels | Tutelage",
  description: "English proficiency levels explained",
  path: '/levels',
  ogImage: '/levels/hero.jpg',
});

export default function LevelsLayout({ children }) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      {children}
    </Suspense>
  );
}
