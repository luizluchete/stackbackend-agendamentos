import { Query } from '@/app/type'
import { ServicePaginated } from '@/slices/service/entities'

export interface LoadServiceByPageRepository {
  loadServiceByPage(query: Query): Promise<ServicePaginated | null>
}
