import { Query } from '@/app/type'
import { CategoryData } from '@/slices/category/entities'

export interface LoadCategoryRepository {
  loadCategory(query: Query): Promise<CategoryData | null>
}
