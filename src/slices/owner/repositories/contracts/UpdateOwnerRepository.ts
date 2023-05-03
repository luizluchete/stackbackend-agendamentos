import { Query } from '@/app/type'
import { OwnerData } from '../../entities'

export interface UpdateOwnerRepository {
  update(query: Query, data: OwnerData): Promise<OwnerData | null>
}
