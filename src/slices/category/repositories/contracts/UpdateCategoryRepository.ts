import { Query } from '@/app/type'
import { CategoryData } from '../../entities'

export interface UpdateCategoryRepository {
  update(query: Query, data: CategoryData): Promise<CategoryData | null>
}
