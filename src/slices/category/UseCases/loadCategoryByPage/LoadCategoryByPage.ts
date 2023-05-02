import { Query } from '@/app/type'
import { LoadCategoryByPageRepository } from '@/slices/category/repositories'
import { CategoryPaginated } from '../../entities'

export class LoadCategoryByPage {
  constructor(private readonly repository: LoadCategoryByPageRepository) {}

  async load(query: Query): Promise<CategoryPaginated | null> {
    return await this.repository.loadCategoryByPage(query)
  }
}
