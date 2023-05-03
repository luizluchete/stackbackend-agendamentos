import { AddRatingResultRepository } from '@/slices/ratingResult/repositories/contracts'
import { RatingResultData, RatingResultEntity } from '../../entities'

export class AddRatingResult {
  constructor(private readonly repository: AddRatingResultRepository) {}

  async execute(data: RatingResultData): Promise<RatingResultEntity | null> {
    return await this.repository.addRatingResult(data)
  }
}
