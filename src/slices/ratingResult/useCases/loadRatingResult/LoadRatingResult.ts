import { Query } from '@/app/type'
import { LoadRatingResultRepository } from '@/slices/ratingResult/repositories/contracts'

export class LoadRatingResult {
  constructor(private readonly repository: LoadRatingResultRepository) {}

  async load(query: Query) {
    return await this.repository.loadRatingResult(query)
  }
}
