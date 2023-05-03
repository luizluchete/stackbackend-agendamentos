import { Query } from '@/app/type'
import { LoadClientRepository } from '@/slices/client/repositories/contracts'

export class LoadClient {
  constructor(private readonly repository: LoadClientRepository) {}

  async load(query: Query) {
    return await this.repository.loadClient(query)
  }
}
