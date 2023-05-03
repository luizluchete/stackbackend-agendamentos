import { Query } from '@/app/type'
import { RequestData } from '../../entities'

export interface UpdateRequestRepository {
  update(query: Query, data: RequestData): Promise<RequestData | null>
}
