import { Query } from '@/app/type'

export interface DeleteRatingResultRepository {
  delete(query: Query): Promise<void>
}
