import { constructMetadata } from "@/hooks/useSeo";

export const metadata = constructMetadata({
  title: "About Us | Tutelage",
  description: "Learn about Tutelage, a Kurdish innovative online English language learning platform founded in 2022. We offer cost-effective courses for kids, teenagers, and adults through interactive lessons, AI-powered tools, and experienced instructors. Discover our journey, achievements, and commitment to making language education accessible and effective for learners from Kurdistan to the world.",
  ogImage: "/about/hero.jpg",
  path: '/about-us'
});

export default function TutelageAboutLayout({ children }) {
  return children;
}
