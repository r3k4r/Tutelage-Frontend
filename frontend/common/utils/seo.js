export const constructMetadata = ({
  title,
  description,
  keywords,
  ogImage = "/default-og-image.jpg",
  path = "",
} = {}) => {
  const seoFallback = {
    title: "Tutelage | Online English Learning Platform in Kurdistan",
    description:
      "Tutelage is Kurdistan's innovative online English learning platform offering courses for kids, teens, and adults. CEFR (A1–C1), IELTS, TOEFL, PTE prep, free ESL resources, and expert-led learning.",
      keywords: "online english learning, learn english kurdistan, english courses kids, english courses teens, english courses adults, esl resources, cefr practice, ielts preparation, toefl preparation, pte preparation, english proficiency testing, interactive english exercises, personalized english support"
};

  const finalTitle = title || seoFallback.title;
  const finalDescription = description || seoFallback.description;
  const finalKeywords = keywords || seoFallback.keywords;
  const imageUrl = ogImage.startsWith("http")
    ? ogImage
    : `https://tutelage.krd${ogImage}`;

  const url = `https://tutelage.krd${path}`;

  return {
    title: finalTitle,
    description: finalDescription,
    keywords: finalKeywords,

    alternates: {
      canonical: url,
    },

    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url,
      siteName: "Tutelage",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: finalTitle,
        },
      ],
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDescription,
      images: [imageUrl],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
};
