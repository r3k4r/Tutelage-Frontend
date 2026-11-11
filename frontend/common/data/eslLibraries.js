// Content for the four ESL library pages (/esl-resources/<slug>).
// `resource` is the RESOURCES key the grid lists; `seo` feeds constructMetadata.

const VIDEO_CATEGORIES = [
  'Tutelage', 'Education', 'AudioBooks', 'Science', 'Technology', 'Business', 'Animation', 'Kids-Learning',
].map((value) => ({ value, label: value.replace('-', ' ') }))

export const ESL_LIBRARIES = {
  audios: {
    resource: 'eslAudios',
    title: 'Audio Library',
    heroImage: '/eslresource/audio/audio_1.jpg',
    gridTitle: 'Our Audio Library',
    intro:
      'Do you want to practice your English by listening to real conversations and audios? Stop learning boring grammar rules and start hearing real English. Our audio library is packed with practical, engaging content including interviews, podcasts, short stories, life experiences and everyday conversations. This diverse resource is perfect for learners of all levels, providing the vocabulary and contextual understanding needed to use English naturally. Enhance your fluency on the go.',
    howToTitle: 'How to use the Audio Library',
    steps: [
      ['Start with a Warm-Up Exercise', 'Get ready before listening.'],
      ['Listen to the Audio', 'Follow along at your own pace.'],
      ['Complete the Post-Exercise', 'Test your understanding after listening.'],
      ['Check the Answers', 'Review your results and improve your comprehension.'],
    ],
    seo: {
      title: 'Audio Library | Tutelage ESL Resources',
      description:
        'Free ESL audio library with real English conversations, interviews, podcasts, short stories, and everyday dialogues. Practice listening comprehension and improve fluency on the go. Stop learning boring grammar rules and start hearing real English with practical, engaging content for all levels. Each audio includes warm-up exercises, comprehension activities, and answer keys. Enhance your English naturally with authentic conversations and contextual understanding.',
      path: '/esl-resources/audios',
      ogImage: '/eslresource/audio/audio_1.jpg',
    },
  },
  blogs: {
    resource: 'blogs',
    title: 'Blog Library',
    heroImage: '/eslresource/blog/blog_1.jpg',
    gridTitle: 'Our Best Blogs',
    intro:
      'Are you looking for interesting blogs to practice your English? Explore our blog Library and get access to a wide range of blogs on topics like language tips, culture, Lifestyle, and learning strategies. Each blog helps you improve reading, vocabulary, and grammar, practice writing and expression, and develop critical thinking by reflecting on ideas and opinions.',
    howToTitle: 'How to enjoy the Blog Library:',
    steps: [
      ['Start with a Warm-Up Exercise', 'Prepare your skills before reading.'],
      ['Read the Blog', 'Explore the content at your own pace.'],
      ['Test Your Understanding', 'Complete a short activity after the blog.'],
      ['Check the Answers', 'Review your results and learn from any mistakes.'],
    ],
    seo: {
      title: 'Blog Library | Tutelage ESL Resources',
      description:
        'Free ESL blog library covering language tips, culture, lifestyle, and learning strategies. Improve your English reading, vocabulary, grammar, writing, and critical thinking skills. Each blog includes warm-up exercises, comprehension activities, and answer keys. Explore diverse topics, practice expression, and develop analytical skills through interesting articles designed for English learners of all levels. Learn at your own pace with engaging content.',
      path: '/esl-resources/blogs',
      ogImage: '/eslresource/blog/blog_1.jpg',
    },
  },
  stories: {
    resource: 'stories',
    title: 'Story Library',
    heroImage: '/eslresource/story/story_1.jpg',
    gridTitle: 'Our Best Stories',
    intro:
      'Do you want to discover stories that help you learn English? Step into our Story Library and enjoy a world of free short stories for every level — from beginner to advanced. Each story is designed to help you build your vocabulary, improve your reading skills, and experience real English through fun and inspiring tales.',
    howToTitle: 'How to enjoy the Story Library:',
    steps: [
      ['Try a Warm-Up Exercise', 'Prepare your skills before reading.'],
      ['Dive into the Story', 'Read and enjoy at your own pace.'],
      ['Test Your Understanding', 'Complete a short activity after the story.'],
      ['Check the Answers', 'See how well you did and learn from any mistakes.'],
    ],
    seo: {
      title: 'Story Library | Tutelage ESL Resources',
      description:
        'Free ESL story library with short stories for every English level from beginner to advanced. Build vocabulary, improve reading skills, and experience real English through fun and inspiring tales. Each story includes warm-up exercises, comprehension activities, and answer keys. Discover engaging narratives that make learning English enjoyable and effective. Read at your own pace and track your progress with self-check activities.',
      path: '/esl-resources/stories',
      ogImage: '/eslresource/story/story_1.jpg',
    },
  },
  videos: {
    resource: 'eslVideos',
    title: 'Video Library',
    heroImage: '/eslresource/video/video_1.jpg',
    gridTitle: 'Our Best Videos',
    searchable: true,
    categories: VIDEO_CATEGORIES,
    intro:
      'Do you want to learn English while watching videos? Dive into our Video Library, featuring a variety of fun and fascinating videos on topics like science, technology, psychology, culture, nature, sports, entertainment, travel, and everyday life. Perfect for learners of all levels, each video helps you improve listening skills, expand vocabulary, and understand real English in action.',
    howToTitle: 'How to use the Video Library',
    steps: [
      ['Start with a Warm-Up Exercise', 'Get ready before watching.'],
      ['Watch the Video', 'Enjoy and follow along at your own pace.'],
      ['Complete the Post-Exercise', 'Test your understanding afterward.'],
      ['Check the Answers', 'Review your results and learn from any mistakes.'],
    ],
    seo: {
      title: 'Video Library | Tutelage ESL Resources',
      description:
        'Free ESL video library featuring engaging content on science, technology, psychology, culture, nature, sports, entertainment, travel, and everyday life. Improve your English listening skills, expand vocabulary, and understand real English in action with videos for all levels. Each video includes warm-up exercises, comprehension activities, and answer keys. Learn English naturally through fun and fascinating topics at your own pace.',
      path: '/esl-resources/videos',
      ogImage: '/eslresource/video/video_1.jpg',
    },
  },
}
