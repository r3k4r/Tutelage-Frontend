import { constructMetadata } from "@/hooks/useSeo";
import { Suspense } from "react";

export const metadata = constructMetadata({
  title: "Languages | Tutelage",
  description: "Overview of available languages and programs (English, Kurdish, Arabic).",
  path: '/languages',
  ogImage: '/languages/lang_1.jpg',
});

export default function LanguagesLayout({ children }) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      {children}
    </Suspense>
  );
}
