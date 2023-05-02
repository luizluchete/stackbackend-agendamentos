import { Query } from '@/app/type'
import { ChapterData } from '@/slices/chapter/entities'

export interface LoadChapterRepository {
  loadChapter(query: Query): Promise<ChapterData | null>
}
