import { Query } from '@/app/type'

export interface DeleteServiceRepository {
  delete(query: Query): Promise<void>
}
