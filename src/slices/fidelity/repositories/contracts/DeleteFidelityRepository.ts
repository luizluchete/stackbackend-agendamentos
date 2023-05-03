import { Query } from '@/app/type'

export interface DeleteFidelityRepository {
  delete(query: Query): Promise<void>
}
