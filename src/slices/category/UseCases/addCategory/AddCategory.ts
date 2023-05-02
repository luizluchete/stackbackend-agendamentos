import { AddCategoryRepository } from '@/slices/category/repositories'
import { CategoryData, CategoryEntity } from '../../entities'

export class AddCategory {
  constructor(private readonly repository: AddCategoryRepository) {}

  async execute(data: CategoryData): Promise<CategoryEntity | null> {
    return this.repository.addCategory(data)
  }
}
