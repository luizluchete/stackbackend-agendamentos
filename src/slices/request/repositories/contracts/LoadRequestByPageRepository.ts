import { Query } from '@/app/type'
import { RequestPaginated } from '@/slices/request/entities'

export interface LoadRequestByPageRepository {
  loadRequestByPage(query: Query): Promise<RequestPaginated | null>
}
