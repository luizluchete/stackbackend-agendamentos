import { Query } from '@/app/type'

export interface DeleteClientRepository {
  delete(query: Query): Promise<void>
}
