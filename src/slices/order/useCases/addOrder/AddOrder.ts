import { AddOrderRepository } from '@/slices/order/repositories/contracts'
import { OrderData, OrderEntity } from '../../entities'

export class AddOrder {
  constructor(private readonly repository: AddOrderRepository) {}

  async execute(data: OrderData): Promise<OrderEntity | null> {
    return await this.repository.addOrder(data)
  }
}
