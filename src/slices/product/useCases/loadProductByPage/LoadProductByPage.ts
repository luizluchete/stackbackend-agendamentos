import { Query } from '@/app/type'
import { LoadProductByPageRepository } from '@/slices/product/repositories'
import { ProductPaginated } from '../../entities'

export class LoadProductByPage {
  constructor(private readonly repository: LoadProductByPageRepository) {}

  async load(query: Query): Promise<ProductPaginated | null> {
    return await this.repository.loadProductByPage(query)
  }
}
