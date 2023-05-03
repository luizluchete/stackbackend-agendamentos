import { Query } from '@/app/type'
import { FidelityData } from '@/slices/fidelity/entities'

export interface LoadFidelityRepository {
  loadFidelity(query: Query): Promise<FidelityData | null>
}
