import LibraryPage from '@/components/pages/esl-resources/LibraryPage'
import { ESL_LIBRARIES } from '@/common/data/eslLibraries'
import { constructMetadata } from '@/common/utils/seo'

export const metadata = constructMetadata(ESL_LIBRARIES.blogs.seo)

export default function Page() {
  return <LibraryPage slug="blogs" />
}
