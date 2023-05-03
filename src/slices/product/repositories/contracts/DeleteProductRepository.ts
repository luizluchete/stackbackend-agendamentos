import { Query } from '@/app/type'

export interface DeleteProductRepository {
  delete(query: Query): Promise<void>
}
