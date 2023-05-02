import { Query } from '@/app/type'
import { LoadCategoryRepository } from '@/slices/category/repositories'

export class LoadCategory {
  constructor(private readonly repository: LoadCategoryRepository) {}

  async load(query: Query) {
    return await this.repository.loadCategory(query)
  }
}
