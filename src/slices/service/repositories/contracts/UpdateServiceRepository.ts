import { Query } from '@/app/type'
import { ServiceData } from '../../entities'

export interface UpdateServiceRepository {
  update(query: Query, data: ServiceData): Promise<ServiceData | null>
}
