import { constructMetadata } from "@/hooks/useSeo";

export const metadata = constructMetadata({
  title: "Video Library | Tutelage ESL Resources",
  description: "Free ESL video library featuring engaging content on science, technology, psychology, culture, nature, sports, entertainment, travel, and everyday life. Improve your English listening skills, expand vocabulary, and understand real English in action with videos for all levels. Each video includes warm-up exercises, comprehension activities, and answer keys. Learn English naturally through fun and fascinating topics at your own pace.",
  ogImage: '/eslresource/video/video_1.jpg',
  path: '/esl-resources/videos',
});

export default function VideoLibraryLayout({ children }) {
  return children;
}
