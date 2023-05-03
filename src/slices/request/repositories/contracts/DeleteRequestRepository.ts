import { Query } from '@/app/type'

export interface DeleteRequestRepository {
  delete(query: Query): Promise<void>
}
