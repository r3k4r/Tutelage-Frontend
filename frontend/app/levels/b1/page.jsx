import LevelPageContent from '@/components/levels/LevelPageContent'

const B1Page = () => {
  const levelData = {
    title: 'B1 – Intermediate',
    image: '/levels/b1/b1_1.jpg',
    description: `At this level students can communicate with some confidence on familiar topics and in everyday situations, even though they may occasionally search for words. They can express opinions, give reasons, and describe experiences, dreams, or ambitions using connected sentences. Their vocabulary allows them to discuss most daily subjects such as work, travel, education, and leisure. In reading, they can understand the main ideas of clear texts on familiar topics, including short articles, emails, or stories. In writing, they can produce simple connected texts such as personal letters, essays, or reports, linking ideas with basic connectors like because, but, or so. Although grammatical errors may appear, their writing and speech are generally clear and coherent.`,
    resources: [
      {
        title: 'B1 Listening',
        description: 'Here you can find listening exercises that match your level, with a brief introduction to help you master each topic.',
        image: '/skills/listen.jpg',
        link: '/skills/listening/b1'
      },
      {
        title: 'B1 Speaking',
        description: 'Here you can find speaking exercises that match your level, with a brief introduction to help you master each topic.',
        image: '/skills/speak.jpg',
        link: '/skills/speaking/b1'
      },
      {
        title: 'B1 Reading',
        description: 'Here you can find reading exercises that match your level, with a brief introduction to help you master each topic.',
        image: '/skills/read.jpg',
        link: '/skills/reading/b1'
      },
      {
        title: 'B1 Writing',
        description: 'Here you can find writing exercises that match your level, with a brief introduction to help you master each topic.',
        image: '/skills/write.jpg',
        link: '/skills/writing/b1'
      }
    ]
  }

  return <LevelPageContent levelData={levelData} />
}

export default B1Page
