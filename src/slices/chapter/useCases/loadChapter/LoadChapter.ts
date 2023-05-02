import { Query } from '@/app/type'
import { LoadChapterRepository } from '@/slices/chapter/repositories/contracts'

export class LoadChapter {
  constructor(private readonly repository: LoadChapterRepository) {}

  async load(query: Query) {
    return await this.repository.loadChapter(query)
  }
}
