import { UpdateRatingRepository } from '@/slices/rating/repositories'
import { RatingData, RatingEntity } from '../../entities'
import { Query } from '@/app/type'

export class UpdateRating {
  constructor(private readonly repository: UpdateRatingRepository) {}

  async execute(
    query: Query,
    data: RatingData
  ): Promise<RatingEntity | null> {
    return await this.repository.update(query, data)
  }
}
