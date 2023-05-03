import { AddProductRepository } from '@/slices/product/repositories/contracts'
import { ProductData, ProductEntity } from '../../entities'

export class AddProduct {
  constructor(private readonly repository: AddProductRepository) {}

  async execute(data: ProductData): Promise<ProductEntity | null> {
    return await this.repository.addProduct(data)
  }
}
