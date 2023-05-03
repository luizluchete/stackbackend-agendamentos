import { UpdateProductRepository } from '@/slices/product/repositories'
import { ProductData, ProductEntity } from '../../entities'
import { Query } from '@/app/type'

export class UpdateProduct {
  constructor(private readonly repository: UpdateProductRepository) {}

  async execute(
    query: Query,
    data: ProductData
  ): Promise<ProductEntity | null> {
    return await this.repository.update(query, data)
  }
}
