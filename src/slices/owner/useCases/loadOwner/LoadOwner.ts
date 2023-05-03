import { Query } from '@/app/type'
import { LoadOwnerRepository } from '@/slices/owner/repositories/contracts'

export class LoadOwner {
  constructor(private readonly repository: LoadOwnerRepository) {}

  async load(query: Query) {
    return await this.repository.loadOwner(query)
  }
}
