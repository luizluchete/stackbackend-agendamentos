import { DeleteRatingRepository } from '@/slices/rating/repositories'
import { Query } from '@/app/type'

export class DeleteRating {
  constructor(private readonly repository: DeleteRatingRepository) {}

  async execute(query: Query): Promise<void> {
    await this.repository.delete(query)
  }
}
