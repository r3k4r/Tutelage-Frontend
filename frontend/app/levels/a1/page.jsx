import LevelPageContent from '@/components/levels/LevelPageContent'

const A1Page = () => {
  const levelData = {
    title: 'A1 Level',
    image: '/levels/a1/a1_1.jpg',
    description: `At this level students can communicate slowly with hesitation using a limited vocabulary. They can express basic simple everyday situations and understand very common phrases like greetings and instructions. They may be familiar with words related to themselves or their family. In reading, they can understand simple sentences. In writing, they can produce basic phrases such as their name, age, or nationality, though grammar and spelling may often be incorrect but still understandable.`,
    resources: [
      {
        title: 'A1 Listening',
        description: 'Here you can find listening exercises that match your level, with a brief introduction to help you master each topic.',
        image: '/skills/listen.jpg',
        link: '/skills/listening/a1'
      },
      {
        title: 'A1 Speaking',
        description: 'Here you can find speaking exercises that match your level, with a brief introduction to help you master each topic.',
        image: '/skills/speak.jpg',
        link: '/skills/speaking/a1'
      },
      {
        title: 'A1 Reading',
        description: 'Here you can find reading exercises that match your level, with a brief introduction to help you master each topic.',
        image: '/skills/read.jpg',
        link: '/skills/reading/a1'
      },
      {
        title: 'A1 Writing',
        description: 'Here you can find writing exercises that match your level, with a brief introduction to help you master each topic.',
        image: '/skills/write.jpg',
        link: '/skills/writing/a1'
      }
    ]
  }

  return <LevelPageContent levelData={levelData} />
}

export default A1Page
