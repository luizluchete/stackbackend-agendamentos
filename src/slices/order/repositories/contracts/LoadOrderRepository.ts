import { Query } from '@/app/type'
import { OrderData } from '@/slices/order/entities'

export interface LoadOrderRepository {
  loadOrder(query: Query): Promise<OrderData | null>
}
