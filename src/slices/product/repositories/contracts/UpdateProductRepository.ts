import { Query } from '@/app/type'
import { ProductData } from '../../entities'

export interface UpdateProductRepository {
  update(query: Query, data: ProductData): Promise<ProductData | null>
}
