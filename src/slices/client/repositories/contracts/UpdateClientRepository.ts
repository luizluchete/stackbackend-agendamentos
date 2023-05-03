import { Query } from '@/app/type'
import { ClientData } from '../../entities'

export interface UpdateClientRepository {
  update(query: Query, data: ClientData): Promise<ClientData | null>
}
