import { DeleteOrderRepository } from '@/slices/order/repositories'
import { Query } from '@/app/type'

export class DeleteOrder {
  constructor(private readonly repository: DeleteOrderRepository) {}

  async execute(query: Query): Promise<void> {
    await this.repository.delete(query)
  }
}
