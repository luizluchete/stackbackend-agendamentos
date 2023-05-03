import { Query } from '@/app/type'
import { RatingResultAverage } from '@/slices/ratingResult/entities'

export interface LoadAverageRatingResultRepository {
  loadAverateRatingReuslt(query: Query): Promise<RatingResultAverage | null>
}
