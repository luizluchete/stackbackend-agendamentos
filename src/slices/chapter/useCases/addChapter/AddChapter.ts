import { AddChapterRepository } from '@/slices/chapter/repositories/contracts'
import { ChapterData, ChapterEntity } from '../../entities'

export class AddChapter {
  constructor(private readonly repository: AddChapterRepository) {}

  async execute(data: ChapterData): Promise<ChapterEntity | null> {
    return this.repository.addChapter(data)
  }
}
