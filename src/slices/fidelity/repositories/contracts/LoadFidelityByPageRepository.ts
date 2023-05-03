import { Query } from '@/app/type'
import { FidelityPaginated } from '@/slices/fidelity/entities'

export interface LoadFidelityByPageRepository {
  loadFidelityByPage(query: Query): Promise<FidelityPaginated | null>
}
