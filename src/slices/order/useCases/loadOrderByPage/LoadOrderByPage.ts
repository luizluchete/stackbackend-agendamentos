import { Query } from '@/app/type'
import { LoadOrderByPageRepository } from '@/slices/order/repositories'
import { OrderPaginated } from '../../entities'

export class LoadOrderByPage {
  constructor(private readonly repository: LoadOrderByPageRepository) {}

  async load(query: Query): Promise<OrderPaginated | null> {
    return await this.repository.loadOrderByPage(query)
  }
}
