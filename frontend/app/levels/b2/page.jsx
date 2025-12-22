import LevelPageContent from '@/components/levels/LevelPageContent'

const B2Page = () => {
  const levelData = {
    title: 'B2 – Upper Intermediate',
    image: '/levels/b2/b2_1.jpg',
    description: `At this level students can communicate clearly and effectively on a wide range of subjects, both familiar and less familiar. They can interact with native speakers with a good degree of fluency, though occasional hesitation or searching for precise words may occur. Their vocabulary is broad enough to discuss abstract ideas, give detailed opinions, and support arguments with explanations or examples. In reading, they can understand the main ideas and details of complex texts, including articles, reports, and literary works, especially when the topics are of personal or professional interest. In writing, they can produce clear, detailed texts such as essays, reviews, or formal letters, organizing their ideas logically and using a range of linking devices. Some grammatical or lexical mistakes may still occur, but they rarely hinder communication.`,
    resources: [
      {
        title: 'B2 Listening',
        description: 'Here you can find listening exercises that match your level, with a brief introduction to help you master each topic.',
        image: '/skills/listen.jpg',
        link: '/skills/listening/b2'
      },
      {
        title: 'B2 Speaking',
        description: 'Here you can find speaking exercises that match your level, with a brief introduction to help you master each topic.',
        image: '/skills/speak.jpg',
        link: '/skills/speaking/b2'
      },
      {
        title: 'B2 Reading',
        description: 'Here you can find reading exercises that match your level, with a brief introduction to help you master each topic.',
        image: '/skills/read.jpg',
        link: '/skills/reading/b2'
      },
      {
        title: 'B2 Writing',
        description: 'Here you can find writing exercises that match your level, with a brief introduction to help you master each topic.',
        image: '/skills/write.jpg',
        link: '/skills/writing/b2'
      }
    ]
  }

  return <LevelPageContent levelData={levelData} />
}

export default B2Page
