import { Query } from '@/app/type'
import { OwnerPaginated } from '@/slices/owner/entities'

export interface LoadOwnerByPageRepository {
  loadOwnerByPage(query: Query): Promise<OwnerPaginated | null>
}
