import { Query } from '@/app/type'

export interface DeleteCategoryRepository {
  delete(query: Query): Promise<void>
}
