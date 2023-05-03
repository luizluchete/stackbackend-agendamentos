import { Query } from '@/app/type'
import { ProductPaginated } from '@/slices/product/entities'

export interface LoadProductByPageRepository {
  loadProductByPage(query: Query): Promise<ProductPaginated | null>
}
