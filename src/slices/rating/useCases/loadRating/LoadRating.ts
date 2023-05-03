import { Query } from '@/app/type'
import { LoadRatingRepository } from '@/slices/rating/repositories/contracts'

export class LoadRating {
  constructor(private readonly repository: LoadRatingRepository) {}

  async load(query: Query) {
    return await this.repository.loadRating(query)
  }
}
