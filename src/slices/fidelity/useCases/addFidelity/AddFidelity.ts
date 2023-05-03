import { AddFidelityRepository } from '@/slices/fidelity/repositories/contracts'
import { FidelityData, FidelityEntity } from '../../entities'

export class AddFidelity {
  constructor(private readonly repository: AddFidelityRepository) {}

  async execute(data: FidelityData): Promise<FidelityEntity | null> {
    return await this.repository.addFidelity(data)
  }
}
