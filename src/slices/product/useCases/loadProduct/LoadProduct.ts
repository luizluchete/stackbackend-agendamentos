import { Query } from '@/app/type'
import { LoadProductRepository } from '@/slices/product/repositories/contracts'

export class LoadProduct {
  constructor(private readonly repository: LoadProductRepository) {}

  async load(query: Query) {
    return await this.repository.loadProduct(query)
  }
}
