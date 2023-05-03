import { Query } from '@/app/type'

export interface DeleteOrderRepository {
  delete(query: Query): Promise<void>
}
