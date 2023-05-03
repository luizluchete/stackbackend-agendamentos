import { Query } from '@/app/type'
import { LoadRatingResultByPageRepository } from '@/slices/ratingResult/repositories'
import { RatingResultPaginated } from '../../entities'

export class LoadRatingResultByPage {
  constructor(private readonly repository: LoadRatingResultByPageRepository) {}

  async load(query: Query): Promise<RatingResultPaginated | null> {
    return await this.repository.loadRatingResultByPage(query)
  }
}
