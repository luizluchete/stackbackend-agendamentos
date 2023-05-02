import { Query } from '@/app/type'
import { LoadChapterByPageRepository } from '@/slices/chapter/repositories'
import { ChapterPaginated } from '../../entities'

export class LoadChapterByPage {
  constructor(private readonly repository: LoadChapterByPageRepository) {}

  async load(query: Query): Promise<ChapterPaginated | null> {
    return await this.repository.loadChapterByPage(query)
  }
}
