import { UpdateCategoryRepository } from '@/slices/category/repositories'
import { CategoryData, CategoryEntity } from '../../entities'
import { Query } from '@/app/type'

export class UpdateCategory {
  constructor(private readonly repository: UpdateCategoryRepository) {}

  async execute(
    query: Query,
    data: CategoryData
  ): Promise<CategoryEntity | null> {
    return await this.repository.update(query, data)
  }
}
