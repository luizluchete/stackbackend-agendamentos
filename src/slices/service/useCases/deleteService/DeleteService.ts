import { DeleteServiceRepository } from '@/slices/service/repositories'
import { Query } from '@/app/type'

export class DeleteService {
  constructor(private readonly repository: DeleteServiceRepository) {}

  async execute(query: Query): Promise<void> {
    await this.repository.delete(query)
  }
}
