import { Query } from '@/app/type'
import { RatingResultData } from '@/slices/ratingResult/entities'

export interface LoadRatingResultRepository {
  loadRatingResult(query: Query): Promise<RatingResultData | null>
}
