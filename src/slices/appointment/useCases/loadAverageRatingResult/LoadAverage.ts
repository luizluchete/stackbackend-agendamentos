import { Query } from '@/app/type'
import { LoadAverageRatingResultRepository } from '@/slices/appointment/repositories/contracts'

export class LoadAverageRatingResult {
  constructor(private readonly repository: LoadAverageRatingResultRepository) {}

  async load(query: Query) {
    return await this.repository.loadAverateRatingReuslt(query)
  }
}
