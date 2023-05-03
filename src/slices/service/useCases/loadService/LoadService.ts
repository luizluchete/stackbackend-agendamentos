import { Query } from '@/app/type'
import { LoadServiceRepository } from '@/slices/service/repositories/contracts'

export class LoadService {
  constructor(private readonly repository: LoadServiceRepository) {}

  async load(query: Query) {
    return await this.repository.loadService(query)
  }
}
