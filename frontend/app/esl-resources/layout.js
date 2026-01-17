import { constructMetadata } from "@/hooks/useSeo";
import { Suspense } from "react";

export const metadata = constructMetadata({
  title: "ESL Resources | Tutelage",
  description: "Free ESL learning resources and materials",
  path: '/esl-resources',
  ogImage: '/eslresource/hero.jpg',
});

export default function ESLResourcesLayout({ children }) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      {children}
    </Suspense>
  );
}
