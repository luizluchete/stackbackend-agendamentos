import { Query } from '@/app/type'
import { RatingData } from '../../entities'

export interface UpdateRatingRepository {
  update(query: Query, data: RatingData): Promise<RatingData | null>
}
