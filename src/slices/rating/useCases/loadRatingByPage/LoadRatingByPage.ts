import { Query } from '@/app/type'
import { LoadRatingByPageRepository } from '@/slices/rating/repositories'
import { RatingPaginated } from '../../entities'

export class LoadRatingByPage {
  constructor(private readonly repository: LoadRatingByPageRepository) {}

  async load(query: Query): Promise<RatingPaginated | null> {
    return await this.repository.loadRatingByPage(query)
  }
}
