import { Query } from '@/app/type'
import { CategoryPaginated } from '@/slices/category/entities'

export interface LoadCategoryByPageRepository {
  loadCategoryByPage(query: Query): Promise<CategoryPaginated | null>
}
