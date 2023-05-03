import { Query } from '@/app/type'
import { OrderData } from '../../entities'

export interface UpdateOrderRepository {
  update(query: Query, data: OrderData): Promise<OrderData | null>
}
