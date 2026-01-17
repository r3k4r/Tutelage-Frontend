import { constructMetadata } from "../../../hooks/useSeo";

export const metadata = constructMetadata({
  title: "Blog Library | Tutelage ESL Resources",
  description: "Free ESL blog library covering language tips, culture, lifestyle, and learning strategies. Improve your English reading, vocabulary, grammar, writing, and critical thinking skills. Each blog includes warm-up exercises, comprehension activities, and answer keys. Explore diverse topics, practice expression, and develop analytical skills through interesting articles designed for English learners of all levels. Learn at your own pace with engaging content.",
  path: '/esl-resources/blogs',
  ogImage: '/eslresource/blog/blog_1.jpg',
});

export default function BlogLibraryLayout({ children }) {
  return children;
}
