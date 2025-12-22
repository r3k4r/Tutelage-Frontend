import LevelPageContent from '@/components/levels/LevelPageContent'

const C1Page = () => {
  const levelData = {
    title: 'C1 – Advanced',
    image: '/levels/c1/c1_1.jpg',
    description: `At this level students can express themselves spontaneously without much obvious searching for words. They can use language flexibly and effectively for social, academic, and professional purposes. Their vocabulary range allows them to discuss complex subjects, express subtle shades of meaning, and adapt their tone to different contexts. In reading, they can understand a wide variety of demanding, longer texts and recognize implicit meaning, attitude, or opinion. In writing, they can produce well-structured, detailed texts on complex topics, showing controlled use of organizational patterns and cohesive devices. Although minor inaccuracies may appear, they are rare and do not affect clarity or precision.`,
    resources: [
      {
        title: 'C1 Listening',
        description: 'Here you can find listening exercises that match your level, with a brief introduction to help you master each topic.',
        image: '/skills/listen.jpg',
        link: '/skills/listening/c1'
      },
      {
        title: 'C1 Speaking',
        description: 'Here you can find speaking exercises that match your level, with a brief introduction to help you master each topic.',
        image: '/skills/speak.jpg',
        link: '/skills/speaking/c1'
      },
      {
        title: 'C1 Reading',
        description: 'Here you can find reading exercises that match your level, with a brief introduction to help you master each topic.',
        image: '/skills/read.jpg',
        link: '/skills/reading/c1'
      },
      {
        title: 'C1 Writing',
        description: 'Here you can find writing exercises that match your level, with a brief introduction to help you master each topic.',
        image: '/skills/write.jpg',
        link: '/skills/writing/c1'
      }
    ]
  }

  return <LevelPageContent levelData={levelData} />
}

export default C1Page
