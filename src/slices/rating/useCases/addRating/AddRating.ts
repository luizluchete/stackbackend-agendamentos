import { AddRatingRepository } from '@/slices/rating/repositories/contracts'
import { RatingData, RatingEntity } from '../../entities'

export class AddRating {
  constructor(private readonly repository: AddRatingRepository) {}

  async execute(data: RatingData): Promise<RatingEntity | null> {
    return await this.repository.addRating(data)
  }
}
