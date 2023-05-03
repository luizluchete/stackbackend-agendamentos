import { DeleteProductRepository } from '@/slices/product/repositories'
import { Query } from '@/app/type'

export class DeleteProduct {
  constructor(private readonly repository: DeleteProductRepository) {}

  async execute(query: Query): Promise<void> {
    await this.repository.delete(query)
  }
}
