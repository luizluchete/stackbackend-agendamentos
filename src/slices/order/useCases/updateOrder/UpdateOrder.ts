import { UpdateOrderRepository } from '@/slices/order/repositories'
import { OrderData, OrderEntity } from '../../entities'
import { Query } from '@/app/type'

export class UpdateOrder {
  constructor(private readonly repository: UpdateOrderRepository) {}

  async execute(
    query: Query,
    data: OrderData
  ): Promise<OrderEntity | null> {
    return await this.repository.update(query, data)
  }
}
