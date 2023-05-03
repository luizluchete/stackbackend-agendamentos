import { Query } from '@/app/type'
import { RideData } from '../../entities'

export interface UpdateRideRepository {
  update(query: Query, data: RideData): Promise<RideData | null>
}
