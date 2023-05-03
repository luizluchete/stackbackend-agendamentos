import { Query } from '@/app/type'
import { ServiceData } from '@/slices/service/entities'

export interface LoadServiceRepository {
  loadService(query: Query): Promise<ServiceData | null>
}
