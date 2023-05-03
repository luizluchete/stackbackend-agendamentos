import { DeleteClientRepository } from '@/slices/client/repositories'
import { Query } from '@/app/type'

export class DeleteClient {
  constructor(private readonly repository: DeleteClientRepository) {}

  async execute(query: Query): Promise<void> {
    await this.repository.delete(query)
  }
}
