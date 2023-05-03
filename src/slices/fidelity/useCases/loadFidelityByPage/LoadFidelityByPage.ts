import { Query } from '@/app/type'
import { LoadFidelityByPageRepository } from '@/slices/fidelity/repositories'
import { FidelityPaginated } from '../../entities'

export class LoadFidelityByPage {
  constructor(private readonly repository: LoadFidelityByPageRepository) {}

  async load(query: Query): Promise<FidelityPaginated | null> {
    return await this.repository.loadFidelityByPage(query)
  }
}
