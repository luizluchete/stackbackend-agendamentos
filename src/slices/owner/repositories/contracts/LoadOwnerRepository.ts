import { Query } from '@/app/type'
import { OwnerData } from '@/slices/owner/entities'

export interface LoadOwnerRepository {
  loadOwner(query: Query): Promise<OwnerData | null>
}
