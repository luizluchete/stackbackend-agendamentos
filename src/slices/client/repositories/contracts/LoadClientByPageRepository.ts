import { Query } from '@/app/type'
import { ClientPaginated } from '@/slices/client/entities'

export interface LoadClientByPageRepository {
  loadClientByPage(query: Query): Promise<ClientPaginated | null>
}
