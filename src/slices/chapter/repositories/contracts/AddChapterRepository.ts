import { ChapterData } from '@/slices/chapter/entities'

export interface AddChapterRepository {
  addChapter(chapter: ChapterData): Promise<ChapterData | null>
}
