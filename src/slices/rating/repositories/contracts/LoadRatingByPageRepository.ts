import { Query } from '@/app/type'
import { RatingPaginated } from '@/slices/rating/entities'

export interface LoadRatingByPageRepository {
  loadRatingByPage(query: Query): Promise<RatingPaginated | null>
}
