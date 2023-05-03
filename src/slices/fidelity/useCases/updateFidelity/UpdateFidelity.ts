import { UpdateFidelityRepository } from '@/slices/fidelity/repositories'
import { FidelityData, FidelityEntity } from '../../entities'
import { Query } from '@/app/type'

export class UpdateFidelity {
  constructor(private readonly repository: UpdateFidelityRepository) {}

  async execute(
    query: Query,
    data: FidelityData
  ): Promise<FidelityEntity | null> {
    return await this.repository.update(query, data)
  }
}
