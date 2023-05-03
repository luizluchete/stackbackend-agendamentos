import { Query } from '@/app/type'
import { RequestData } from '@/slices/request/entities'

export interface LoadRequestRepository {
  loadRequest(query: Query): Promise<RequestData | null>
}
