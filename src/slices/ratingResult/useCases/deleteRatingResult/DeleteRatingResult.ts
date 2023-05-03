import { DeleteRatingResultRepository } from '@/slices/ratingResult/repositories'
import { Query } from '@/app/type'

export class DeleteRatingResult {
  constructor(private readonly repository: DeleteRatingResultRepository) {}

  async execute(query: Query): Promise<void> {
    await this.repository.delete(query)
  }
}
