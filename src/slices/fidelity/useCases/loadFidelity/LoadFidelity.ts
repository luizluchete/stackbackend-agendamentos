import { Query } from '@/app/type'
import { LoadFidelityRepository } from '@/slices/fidelity/repositories/contracts'

export class LoadFidelity {
  constructor(private readonly repository: LoadFidelityRepository) {}

  async load(query: Query) {
    return await this.repository.loadFidelity(query)
  }
}
