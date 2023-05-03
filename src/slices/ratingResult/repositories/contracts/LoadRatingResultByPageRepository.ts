import { Query } from '@/app/type'
import { RatingResultPaginated } from '@/slices/ratingResult/entities'

export interface LoadRatingResultByPageRepository {
  loadRatingResultByPage(query: Query): Promise<RatingResultPaginated | null>
}
