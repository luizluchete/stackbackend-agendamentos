import { Query } from '@/app/type'
import { LoadRequestRepository } from '@/slices/request/repositories/contracts'

export class LoadRequest {
  constructor(private readonly repository: LoadRequestRepository) {}

  async load(query: Query) {
    return await this.repository.loadRequest(query)
  }
}
