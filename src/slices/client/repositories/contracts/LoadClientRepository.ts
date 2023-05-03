import { Query } from '@/app/type'
import { ClientData } from '@/slices/client/entities'

export interface LoadClientRepository {
  loadClient(query: Query): Promise<ClientData | null>
}
