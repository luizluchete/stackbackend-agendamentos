import { Query } from '@/app/type'

export interface DeleteRideRepository {
  delete(query: Query): Promise<void>
}
