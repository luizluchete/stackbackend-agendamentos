import { Query } from '@/app/type'
import { LoadOrderRepository } from '@/slices/order/repositories/contracts'

export class LoadOrder {
  constructor(private readonly repository: LoadOrderRepository) {}

  async load(query: Query) {
    return await this.repository.loadOrder(query)
  }
}
