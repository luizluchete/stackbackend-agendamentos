import { DeleteCategoryRepository } from '@/slices/category/repositories'
import { Query } from '@/app/type'

export class DeleteCategory {
  constructor(private readonly repository: DeleteCategoryRepository) {}

  async execute(query: Query): Promise<void> {
    await this.repository.delete(query)
  }
}
