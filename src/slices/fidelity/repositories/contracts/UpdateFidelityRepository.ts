import { Query } from '@/app/type'
import { FidelityData } from '../../entities'

export interface UpdateFidelityRepository {
  update(query: Query, data: FidelityData): Promise<FidelityData | null>
}
