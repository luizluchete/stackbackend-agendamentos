import { Query } from '@/app/type'
import { OrderPaginated } from '@/slices/order/entities'

export interface LoadOrderByPageRepository {
  loadOrderByPage(query: Query): Promise<OrderPaginated | null>
}
