import { UpdateRatingResultRepository } from '@/slices/ratingResult/repositories'
import { RatingResultData, RatingResultEntity } from '../../entities'
import { Query } from '@/app/type'

export class UpdateRatingResult {
  constructor(private readonly repository: UpdateRatingResultRepository) {}

  async execute(
    query: Query,
    data: RatingResultData
  ): Promise<RatingResultEntity | null> {
    return await this.repository.update(query, data)
  }
}
