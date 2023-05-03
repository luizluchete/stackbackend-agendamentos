import { Query } from '@/app/type'
import { RatingResultData } from '../../entities'

export interface UpdateRatingResultRepository {
  update(query: Query, data: RatingResultData): Promise<RatingResultData | null>
}
