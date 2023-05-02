import { Query } from '@/app/type'
import { ChapterPaginated } from '@/slices/chapter/entities'

export interface LoadChapterByPageRepository {
  loadChapterByPage(query: Query): Promise<ChapterPaginated | null>
}
