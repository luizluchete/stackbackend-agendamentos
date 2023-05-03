import { Query } from '@/app/type'
import { RatingData } from '@/slices/rating/entities'

export interface LoadRatingRepository {
  loadRating(query: Query): Promise<RatingData | null>
}
