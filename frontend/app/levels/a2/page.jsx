import LevelPageContent from '@/components/levels/LevelPageContent'

const A2Page = () => {
  const levelData = {
    title: 'A2 – Elementary',
    image: '/levels/a2/a2_1.jpg',
    description: `At this level students can communicate in short conversations about familiar topics, though they may still pause while speaking. Their vocabulary is limited to everyday topics such as family, work, shopping, or hobbies. They can express basic opinions, describe simple experiences, and handle predictable situations in daily life. In reading, they can understand short, simple texts such as messages, personal letters, or brief articles on familiar topics. In writing, they can produce short paragraphs and simple connected sentences to describe events, people, or routines. Errors in grammar and spelling are still common, but the overall message is usually clear and understandable.`,
    resources: [
      {
        title: 'A2 Listening',
        description: 'Here you can find listening exercises that match your level, with a brief introduction to help you master each topic.',
        image: '/skills/listen.jpg',
        link: '/skills/listening/a2'
      },
      {
        title: 'A2 Speaking',
        description: 'Here you can find speaking exercises that match your level, with a brief introduction to help you master each topic.',
        image: '/skills/speak.jpg',
        link: '/skills/speaking/a2'
      },
      {
        title: 'A2 Reading',
        description: 'Here you can find reading exercises that match your level, with a brief introduction to help you master each topic.',
        image: '/skills/read.jpg',
        link: '/skills/reading/a2'
      },
      {
        title: 'A2 Writing',
        description: 'Here you can find writing exercises that match your level, with a brief introduction to help you master each topic.',
        image: '/skills/write.jpg',
        link: '/skills/writing/a2'
      }
    ]
  }

  return <LevelPageContent levelData={levelData} />
}

export default A2Page
