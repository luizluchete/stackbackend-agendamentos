import { DeleteRequestRepository } from '@/slices/request/repositories'
import { Query } from '@/app/type'

export class DeleteRequest {
  constructor(private readonly repository: DeleteRequestRepository) {}

  async execute(query: Query): Promise<void> {
    await this.repository.delete(query)
  }
}
