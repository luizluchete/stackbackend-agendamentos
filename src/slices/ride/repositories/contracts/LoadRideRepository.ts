import { Query } from '@/app/type'
import { RideData } from '@/slices/ride/entities'

export interface LoadRideRepository {
  loadRide(query: Query): Promise<RideData | null>
}
