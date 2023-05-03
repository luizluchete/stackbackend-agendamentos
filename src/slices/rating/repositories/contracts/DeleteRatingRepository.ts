import { Query } from '@/app/type'

export interface DeleteRatingRepository {
  delete(query: Query): Promise<void>
}
